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

type HSL = { hue: number, saturation: number, lightness: number }
function isHSL(o: any): o is HSL {
  const hsl = o as HSL
  return hsl &&
    typeof hsl.hue === 'string' && 
    typeof hsl.saturation === 'string' && 
    typeof hsl.lightness === 'string'
}

export type Color = HSL
export type ColorSet = Color[][]

function isColor(o: any): o is Color {
  return isHSL(o)
}

export function isColorSet(o: any): o is ColorSet {
  return Array.isArray(o as ColorSet) && o.length > 0 && Array.isArray(o[0]) && isColor(o[0][0])
}

export default ColorSet
