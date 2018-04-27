const Tabl = require('.')


const loremTabl = new Tabl([
  new Tabl.Column('Lorem', {width: 9}),
  new Tabl.Column('Ipsom', {width: 11}),
  new Tabl.Column('Dolor', {width: 5}),
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
loremTabl.headerColor = 36
console.log('')
console.log(loremTabl.toString())
console.log('')



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
  [97.113, 29.066, 53.380, 13.139],
  [0.004, 24.473, 4.045, 78.863],
  [20.150, 14.283, 10.191, '29.616'],
  [9.373, 5.278, 72.160, 4.538],
  [39.980, 48.640, 23.655, 24.268]
])
numTabl.headerColor = 35
console.log(numTabl.toString())
console.log('')
