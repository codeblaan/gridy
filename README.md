Gridy
=====
[ ![Codeship Status for codeblaan/gridy](https://app.codeship.com/projects/7efc04d0-2bf3-0136-e263-56d0818919a1/status?branch=master)](https://app.codeship.com/projects/287911)

Super simple way to create a table for printing out for node.

## Install
`yarn install`

## Test
`yarn test`

## Examples
`yarn examples`


Printing out some words all nice like
```javascript
const loremGrid = new Gridy([
  new Gridy.Column('Lorem', {width: 9}),
  new Gridy.Column('Ipsom', {width: 11}),
  new Gridy.Column('Dolor', {width: 5}),
], [
  ['Lorem', 'ipsum', 'dolor'],
  ['sit', 'amet', 'consectetur'],
  ['adipiscing', 'elit', 'sed'],
  ['do', 'eiusmod', 'tempor'],
  ['incididunt', 'ut', 'labore'],
  ['et', 'dolore', 'magna'],
  ['aliqua', 'Ut', 'enim'],
  ['ad', 'minim', 'veniam'],
  ['quis', 'nostrud', 'exercitation'],
  ['ullamco', 'laboris', 'nisi'],
  ['ut', 'aliquip', 'ex'],
  ['ea', 'commodo', 'consequat']
])
console.log(loremGrid.toString())
```

```
  Lorem     Ipsom       Dolor

  Lorem     ipsum       dolor
  sit       amet        cons…
  adipisci… elit        sed
  do        eiusmod     temp…
  incididu… ut          labo…
  et        dolore      magna
  aliqua    Ut          enim
  ad        minim       veni…
  quis      nostrud     exer…
  ullamco   laboris     nisi
  ut        aliquip     ex
  ea        commodo     cons…
```

And some numbers
```javascript
const numGrid = new Gridy([
  new Gridy.Column('One', {width: 9, align: 'right'}),
  new Gridy.Column('Two', {width: 9, align: 'right'}),
  new Gridy.Column('Three', {width: 10, align: 'right'}),
  new Gridy.Column('Four', {width: 9, align: 'right'}),
], [
  [91.472, 49.539, 7.807, 88.139],
  [9.255, 26.788, 46.567, 93.966],
  [83.141, 0.235, 9.844, 0.138],
  [44.625, '41.934', 17.043, 5.616],
  [97.113, 29.066, 53.380, 13.139],
  [0.004, 24.473, 4.045, 78.863],
  [20.150, 14.283, 10.191, '29.616'],
  [9.373, 5.278, 72.160, 4.538],
  [39.980, 48.640, 23.655, 24.268]
])
console.log(numGrid.toString())
```

```
        One       Two      Three      Four

     91.472    49.539      7.807    88.139
      9.255    26.788     46.567    93.966
     83.141     0.235      9.844     0.138
     44.625    41.934     17.043     5.616
     97.113    29.066      53.38    13.139
      0.004    24.473      4.045    78.863
      20.15    14.283     10.191    29.616
      9.373     5.278      72.16     4.538
      39.98     48.64     23.655    24.268
```
