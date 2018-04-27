Tabl
=====
[ ![Codeship Status for codeblaan/tabl](https://app.codeship.com/projects/7efc04d0-2bf3-0136-e263-56d0818919a1/status?branch=master)](https://app.codeship.com/projects/287911)

Super simple way to create a table for printing out for node.

## Install
`yarn add tabl` or `npm install tabl`

## Develop
`yarn install`

## Test
`yarn test`

## Examples
`yarn examples`


Printing out some words all nice like
```javascript
const Tabl = require('tabl')

const loremTabl = new Tabl([
  new Tabl.Column('Lorem', {width: 9}),
  new Tabl.Column('Ipsom', {width: 11}),
  new Tabl.Column('Dolor', {width: 5}),
], [
  ['sit', 'amet', 'consectetur'],
  ['adipiscing', 'elit', 'sed'],
  ['do', 'eiusmod', 'tempor'],
  ['incididunt', 'ut', 'labore'],
  ['et', 'dolore', 'magna'],
])
console.log(loremTabl.toString())
```

```
  Lorem     Ipsom       Dolor

  sit       amet        cons…
  adipisci… elit        sed
  do        eiusmod     temp…
  incididu… ut          labo…
  et        dolore      magna
```

And some numbers
```javascript
const Tabl = require('tabl')

const numTabl = new Tabl([
  new Tabl.Column('One', {width: 9, align: 'right'}),
  new Tabl.Column('Two', {width: 9, align: 'right'}),
  new Tabl.Column('Three', {width: 10, align: 'right'}),
  new Tabl.Column('Four', {width: 9, align: 'right'}),
], [
  [91.472, 49.539, 7.807, 88.139],
  [9.255, 26.788, 46.567, 93.966],
  [83.141, 0.235, 9.844, 0.138],
  [44.625, '41.934', 17.043, 5.616],
])
console.log(numTabl.toString())
```

```
        One       Two      Three      Four

     91.472    49.539      7.807    88.139
      9.255    26.788     46.567    93.966
     83.141     0.235      9.844     0.138
     44.625    41.934     17.043     5.616
```
