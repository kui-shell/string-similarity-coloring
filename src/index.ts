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

type Assignment<C = Color> = { primary: number, secondary: number, color: C }

type State = {
  // not indexed by input array A
  primaries: string[]

  // indexed by input array A
  assignment: Assignment[]

  // map from primary to idx into assignment array
  tmp: Record<string, number>
}

/**
 * Update State to assign a color to A[idx]
 *
 */
function assignColor(str: string, originalIdx: number, state: State, colorSet: ColorSet): State {
  const match = state.primaries.length === 0 ? { bestMatch: undefined } : ss.findBestMatch(str, state.primaries)
  const { bestMatch } = match

  if (!bestMatch || bestMatch.rating === 0) {
    // no good matches
    if (state.primaries.length < colorSet.length) {
      // reserve a primary color from the ColorSet
      const primaryColor = colorSet[state.primaries.length][0]
      state.tmp[str] = originalIdx
      state.assignment[originalIdx] = {
        primary: state.primaries.length,
        secondary: 0,
        color: primaryColor
      }
      state.primaries.push(str)
      debug('assigning new primary', str, primaryColor)
    } else {
      // no more primary colors left in the given ColorSet
      // pick a random one
      const randomColorSetIdx = ~~(Math.random() * colorSet.length)
      const color = colorSet[randomColorSetIdx][0]
      state.tmp[str] = originalIdx
      state.assignment[originalIdx] = {
        primary: randomColorSetIdx,
        secondary: 0,
        color
      }
      debug('assigning random primary', str, color, match)
    }
  } else {
    // we found a good match!
    const primaryOriginalIdx = state.tmp[bestMatch.target]
    const { primary, color: primaryColor } = state.assignment[primaryOriginalIdx]

    const secondary = ~~(bestMatch.rating * colorSet[0].length)

    const color = colorSet[primary][secondary]

    state.assignment[originalIdx] = {
      primary,
      secondary,
      color
    }
      
    debug('variant of primary', str, primaryColor, color)
  }

  return state
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
    .map((str, originalIdx) => ({ str, originalIdx }))
    .reduce((state, _, idx, A) => assignColor(A[idx].str, A[idx].originalIdx, state, colorSet),
            { primaries: [] as string[], assignment: [] as Assignment[], tmp: {} })
    .assignment
    .map(_ => ({
      primary: _.primary,
      secondary: _.secondary,
      color: `#${convert.hsl.hex([_.color.hue, _.color.saturation, _.color.lightness])}`
    }))
}
