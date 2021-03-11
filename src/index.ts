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

import defaults from './defaults'
import { darkenBy } from './util'
import Options, { hasColorSet, hasNColors } from './options'
import { Color, ColorSet, isColorSet, colorSetOfN } from './ColorSet'

const debug = Debug('string-colors')

type State = {
  primaries: string[] // not indexed by input array A
  assignment: Color[] // indexed by input array A

  tmp: Record<string, Color> // map from primary to color assignment for that primary
}

/**
 * Update State to assign a color to A[idx]
 *
 */
function assignColor(str: string, originalIdx: number, state: State, colorSet: ColorSet): State {
  const { bestMatch } = state.primaries.length === 0 ? { bestMatch: undefined } : ss.findBestMatch(str, state.primaries)

  if (!bestMatch || bestMatch.rating === 0) {
    // no good matches
    if (state.primaries.length < colorSet.length) {
      // reserve a primary color from the ColorSet
      const primaryColor = colorSet[state.primaries.length]
      state.primaries.push(str)
      state.tmp[str] = primaryColor
      state.assignment[originalIdx] = primaryColor
      debug('assigning new primary', str, primaryColor)
    } else {
      // no more primary colors left in the given ColorSet
      // pick a random one
      const randomColorSetIdx = ~~(Math.random() * colorSet.length)
      const color = colorSet[randomColorSetIdx]
      state.assignment[originalIdx] = color
      debug('assigning random primary', str, color)
    }
  } else {
    // we found a good match!
    const primaryColor = state.tmp[bestMatch.target]
    const color = darkenBy(primaryColor, bestMatch.rating)
    state.assignment[originalIdx] = color
    debug('variant of primary', str, primaryColor, color)
  }

  return state
}


/**
 * Takes a list of N strings, and returns a parallel list of N
 * colors. The number of distinct colors in the return value will be
 * M, where M is given by options.colorSet, options.nColors, or the
 * default color set, which has 4 colors.
 *
 * @return array of hex strings
 *
 */
export default function colorize(A: string[], options: Options): string[] {
  const colorSet = hasColorSet(options) ? options.colorSet
    : hasNColors(options) ? colorSetOfN(options.nColors)
    : defaults[4]

  return A
    .map((str, originalIdx) => ({ str, originalIdx }))
    .sort((a, b) => a.str.length - b.str.length)
    .reduce((state, _, idx, A) => assignColor(A[idx].str, A[idx].originalIdx, state, colorSet),
            { primaries: [] as string[], assignment: [] as Color[], tmp: {} })
    .assignment
    .map(_ => `#${convert.hsl.hex([_.hue, _.saturation, _.lightness])}`)
}
