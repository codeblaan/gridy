const Gridy = require('.')


const loremGrid = new Gridy([
  new Gridy.Column('Lorem', 9),
  new Gridy.Column('Ipsom', 11),
  new Gridy.Column('Dolor', 5),
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
loremGrid.headerColor = 36
console.log('')
console.log(loremGrid.toString())
console.log('')



const numGrid = new Gridy([
  new Gridy.Column('One', 9, {align: 'right'}),
  new Gridy.Column('Two', 9, {align: 'right'}),
  new Gridy.Column('Three', 10, {align: 'right'}),
  new Gridy.Column('Four', 9, {align: 'right'}),
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
numGrid.headerColor = 35
console.log(numGrid.toString())
console.log('')
