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

/** Attribution: https://colorbrewer2.org/#type=diverging&scheme=RdBu&n=11 */

const blue = [
//  '#053061',
  '#2166ac',
  '#4393c3',
  '#92c5de',
  '#d1e5f0'
]

const red = [
//  '#67001f',
  '#b2182b',
  '#d6604d',
  '#f4a582',
  '#fddbc7'
]

const purple = [
//  '#40004b',
  '#762a83',
  '#9970ab',
  '#c2a5cf',
  '#e7d4e8'
]

const green = [
//  '#00441b',
  '#1b7837',
  '#5aae61',
  '#a6dba0',
  '#d9f0d3'
]

const gray = [
//  '#1a1a1a',
  '#4d4d4d',
  '#878787',
  '#bababa',
  '#e0e0e0'
]

const teal = [
//  '#003c30',
  '#01665e',
  '#35978f',
  '#80cdc1',
  '#c7eae5'
]

const magenta = [
//  '#8e0152',
  '#c51b7d',
  '#de77ae',
  '#f1b6da',
  '#fde0ef'
]

/** Indexed by number of colors */
const defaultColorSet: ColorSet = [ 
  blue.map(hsl),
  green.map(hsl),
  gray.map(hsl),
  teal.map(hsl),
  purple.map(hsl),
  red.map(hsl),
  magenta.map(hsl)
]

export default defaultColorSet

