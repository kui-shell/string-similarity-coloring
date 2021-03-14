# String Similarity Coloring

This package includes a set of heuristics to map a set of N strings to
a set of M<N colors. There are two supported themes:
[`colorbrewer`](https://colorbrewer2.org/) and
[`patternfly4`](https://www.patternfly.org/v4/).

## Getting Started

```
npm install string-similarity-coloring
```

To choose between the two themes, specify via the `theme` option to
the main exported function. For example, in the following example, we
chose to use the `colorbrewer` theme.

<img align="right" width="252" src="https://github.com/kui-shell/string-similarity-coloring/raw/main/docs/string-similarity-coloring.png">

```typescript
import ssc from 'string-similarity-coloring'

// returns an array of color-class assignments,
// parallel to the input array of strings
ssc(['apache-coyote', 'apache', 'nginx 1',
     'nginx 2', 'nginx', 'microsoft a'],
    { theme: 'colorbrewer' })
[
 { primary: 0, secondary: 0, color: '#2166AB' },
 { primary: 0, secondary: 2, color: '#91C4DE' },
 { primary: 1, secondary: 0, color: '#B4182B' },
 { primary: 1, secondary: 3, color: '#FDDCC9' },
 { primary: 1, secondary: 3, color: '#FDDCC9' },
 { primary: 2, secondary: 0, color: '#762A83' }
]
```

Where `primary` is the primary classification of the string, and
`secondary` is a secondary classification, based on distance of this
string from the string that defines the primary. If you want to use
your own color assignments, you can use the `primary` and
`secondary`. Otherwise, you can use the color scheme provided in the
response.

---

Magic from [IBM Research](https://www.research.ibm.com/).

<img width="100" src="https://github.com/kui-shell/string-similarity-coloring/raw/main/docs/ibm-research-logo.png">
