# String Similarity Coloring

```
npm install string-similarity-coloring

DEBUG=* node

require('string-similarity-coloring').default(['apache-coyote', 'apache', 'nginx 1', 'nginx 2', 'nginx', 'microsoft a'])
  string-colors assigning new primary nginx { hue: 201, saturation: 52, lightness: 77 } +0ms
  string-colors assigning new primary apache { hue: 204, saturation: 71, lightness: 41 } +2ms
  string-colors variant of primary nginx 1 { hue: 201, saturation: 52, lightness: 77 } { hue: 201, saturation: 52, lightness: 68.44444444444444 } +0ms
  string-colors variant of primary nginx 2 { hue: 201, saturation: 52, lightness: 77 } { hue: 201, saturation: 52, lightness: 68.44444444444444 } +0ms
  string-colors assigning new primary microsoft a { hue: 92, saturation: 57, lightness: 71 } +0ms
  string-colors variant of primary apache-coyote { hue: 204, saturation: 71, lightness: 41 } { hue: 204, saturation: 71, lightness: 24.11764705882353 } +1ms
[
  { hue: 201, saturation: 52, lightness: 77 },
  { hue: 204, saturation: 71, lightness: 41 },
  { hue: 201, saturation: 52, lightness: 68.44444444444444 },
  { hue: 201, saturation: 52, lightness: 68.44444444444444 },
  { hue: 92, saturation: 57, lightness: 71 },
  { hue: 204, saturation: 71, lightness: 24.11764705882353 }
]
```
