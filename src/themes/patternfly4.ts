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

import { hsl } from '../util'
import ColorSet from '../ColorSet'

/** Attribution: https://github.com/patternfly/patternfly-org/blob/master/packages/v4/src/content/design-guidelines/styles/colors-for-charts/colors-for-charts.css */

const blue = [
  '#002f5d',
  '#004b95',
  '#06c',
  '#519de9',
  '#8bc1f7'
]

const red = [
  '#2c0000',
  '#470000',
  '#7d1007',
  '#a30000',
  '#c9190b'
]

const purple = [
  '#2a265f',
  '#3c3d99',
  '#5752d1',
  '#8481dd',
  '#b2b0ea'
]

const green = [
  '#23511e',
  '#38812f',
  '#4cb140',
  '#7cc674',
  '#bfe2bb' // hsl(114, 41%, 81%)
]

const gray = [
  '4d5258',
  '#72767b',
  '#8b8d8f',
  '#bbb',
  '#d2d2d2'
]

const cyan = [
  '#003737',
  '#005f60',
  '#009596',
  '#73c5c5',
  '#a2d9d9'
]

const gold = [
  '#c58c00',
  '#f0ab00',
  '#f4c145',
  '#f6d173',
  '#f9e0a2'
]

const orange = [
  '#8f4700',
  '#c46100',
  '#ec7a08',
  '#ef9234',
  '#f4b678'
]

/** Indexed by number of colors */
const colorSet: ColorSet = [ 
  blue.map(hsl),
  green.map(hsl),
  gray.map(hsl),
  orange.map(hsl),
  cyan.map(hsl),
  purple.map(hsl),
  red.map(hsl),
  gold.map(hsl)
]

export default colorSet

