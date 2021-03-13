/*
 * Copyright 2021 IBM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Debug from 'debug'
import ss from 'string-similarity'
import convert from 'color-convert'

import { Color, ColorSet } from './ColorSet'
import Options, { hasColorSet } from './options'
import defaults, { defaultFor } from './defaults'

const debug = Debug('string-similarity-coloring')

type Assignment<C = Color> = {
  primary: number
  secondary: number
  color: C

  /** Did we get a bucket conflict, and have to resort to a random color assignment? */
  isRandomAssignment: boolean
}

type State = {
  // not indexed by input array A
  primaries: string[]

  // indexed by input array A
  assignment: Assignment[]

  // map from primary to idx into assignment array
  tmp: Record<string, number>

  // population of each primary; parallel to the outer ColorSet array
  primaryPopulation: number[]
}

function stringHash(str: string, prefix: number) {
  let hash = 0
  const L = Math.min(str.length, prefix)
  for (let idx = 0; idx < L; idx++) {
    hash = str.charCodeAt(idx) | hash
  }
  return hash
}

/**
 * Update State to assign a color to A[idx]
 *
 */
function assignColor(str: string, originalIdx: number, state: State, colorSet: ColorSet, allStrings: string[]): State {
  const match = state.primaries.length === 0
    ? { bestMatch: undefined }
    : ss.findBestMatch(str, state.primaries)
  const { bestMatch } = match

  if (!bestMatch || bestMatch.rating === 0) {
    // no good matches

    // reserve a primary color from the ColorSet
    // const primary = state.primaries.length // <-- round robin color assignment
    const primary = stringHash(str, 3) % colorSet.length
    const secondary = state.primaryPopulation[primary]

    if (secondary === 0) {
      const color = colorSet[primary][0]
      state.tmp[str] = originalIdx
      state.primaries.push(str)
      state.primaryPopulation[primary]++
      state.assignment[originalIdx] = {
        primary,
        secondary,
        color,
        isRandomAssignment: false
      }
      debug('assigning new primary', str, color)
    } else {
      // no more primary colors left in the given ColorSet
      // pick the next one and hope for the best
      // we could use a random assignment, or we could scan for an empty color class
      // however, we desire consistency; and, if the user calls us with the
      // string set in sorted order of importance to them, then we will only
      // have conflicts for the less important strings
      const newPrimary = (primary + 1) % colorSet.length

      let secondary: number
      let isRandomAssignment = false
      if (state.primaryPopulation[newPrimary] === 0) {
        // then our random hop found an empty primary
        state.primaries.push(str)
        secondary = 0
      } else {
        const primaryOriginalIdx = state.assignment.findIndex(_ => _.primary === newPrimary)
        const { bestMatch } = ss.findBestMatch(str, [allStrings[primaryOriginalIdx]])

        // use distance from primary as index into secondary color
        secondary = ~~(bestMatch.rating * colorSet[newPrimary].length)
        isRandomAssignment = true
      }

      const color = colorSet[newPrimary][secondary]

      state.tmp[str] = originalIdx
      state.assignment[originalIdx] = {
        primary: newPrimary,
        secondary,
        color,
        isRandomAssignment
      }
      debug('assigning random primary', str, newPrimary, secondary, color, match)
    }
  } else {
    // we found a good match!
    const primaryOriginalIdx = state.tmp[bestMatch.target]
    const { primary, color: primaryColor } = state.assignment[primaryOriginalIdx]

    // use distance from primary as index into secondary color
    const secondary = ~~(bestMatch.rating * colorSet[primary].length)
    const color = colorSet[primary][secondary]

    state.primaryPopulation[primary]++
    state.assignment[originalIdx] = {
      primary,
      secondary,
      color,
      isRandomAssignment: false
    }
      
    debug('variant of primary', str, primaryOriginalIdx, color)
  }

  return state
}

/** @return empty initial state for the given `ColorSet` */
function newStateFor(colorSet: ColorSet): State {
  return {
    primaries: [] as string[],
    assignment: [] as Assignment[],
    tmp: {},
    primaryPopulation: new Array(colorSet.length).fill(0)
  }
}

/**
 * Takes a list of N strings, and returns a parallel list of N
 * colors. The number of distinct colors in the return value will be
 * M, where M is given by options.colorSet or the default color set,
 * which has 6 primary colors, and 4 secondary colors.
 *
 * @return array of hex strings
 *
 */
export default function colorize(A: string[], options?: Options): Assignment<string>[] {
  const colorSet = hasColorSet(options) ? options.colorSet : options && options.theme ? defaultFor(options.theme) : defaults

  return A
    .reduce((state, str, idx) => assignColor(str, idx, state, colorSet, A),
            newStateFor(colorSet))
    .assignment
    .map(_ => Object.assign(_, {
      color: `#${convert.hsl.hex([_.color.hue, _.color.saturation, _.color.lightness])}`
    }))
}
