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

import convert from 'color-convert'
import { Color, ColorSet } from './ColorSet'

function hsl(hex: string): Color {
  const hsl = convert.hex.hsl(hex)
  return { hue: hsl[0], saturation: hsl[1], lightness: hsl[2] }
}

const A = '#1f78b4'
const B = '#33a02c'
const C = '#e31a1c'
const D = '#ff7f00'
const E = '#6a3d9a'
const F = '#b15928'
const AA = '#a6cee3'
const BB = '#b2df8a'
const CC = '#fb9a99'
const DD = '#fdbf6f'
const EE = '#cab2d6'
const FF = '#ffff99'
const one = [A]
const two = [A, B]
const three = [A, B, C]
const four = [A, B, C, D]
const five = [A, B, C, D, E]
const six = [A, B, C, D, E, F]
const seven = six.concat([AA])
const eight = seven.concat([BB])
const nine = eight.concat([CC])
const ten = nine.concat([DD])
const eleven = ten.concat([EE])
const twelve = eleven.concat([FF])

/** Indexed by number of colors */
const defaultColorSets: ColorSet[] = [ 
  one.map(hsl),
  two.map(hsl),
  three.map(hsl),
  three.map(hsl),
  four.map(hsl),
  five.map(hsl),
  six.map(hsl),
  seven.map(hsl),
  eight.map(hsl),
  nine.map(hsl),
  ten.map(hsl),
  eleven.map(hsl),
  twelve.map(hsl)
]

export default defaultColorSets

