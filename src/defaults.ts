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

const three = ['#a6cee3', '#1f78b4', '#b2df8a']
const four = three.concat(['#33a02c'])
const five = four.concat(['#fb9a99'])
const six = five.concat(['#e31a1c'])
const seven = six.concat(['#fdbf6f'])
const eight = seven.concat(['#ff7f00'])
const nine = eight.concat(['#cab2d6'])
const ten = nine.concat(['#6a3d9a'])
const eleven = ten.concat(['#ffff99'])
const twelve = eleven.concat(['#b15928'])

/** Indexed by number of colors */
const defaultColorSets: ColorSet[] = [ 
  undefined as unknown as ColorSet,
  undefined as unknown as ColorSet,
  undefined as unknown as ColorSet,
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

