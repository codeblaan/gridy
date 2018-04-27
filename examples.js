const Tabl = require('.')


const loremTabl = new Tabl([
  new Tabl.Column('Lorem', {width: 9}),
  new Tabl.Column('Ipsom', {width: 11}),
  new Tabl.Column('Dolor', {width: 5}),
], [
  ['sit', 'amet', 'consectetur'],
  ['adipiscing', 'elit', 'sed'],
  ['do', 'eiusmod', 'tempor'],
  ['incididunt', 'ut', 'labore'],
  ['et', 'dolore', 'magna']
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
  [97.113, 29.066, 53.380, 13.139]
])
numTabl.headerColor = 35
console.log(numTabl.toString())
console.log('')


const differentAlignTabl = new Tabl([
  new Tabl.Column('Lorem', {width: 15, align: 'center'}),
  new Tabl.Column('Ipsom', {width: 20, align: 'center'}),
  new Tabl.Column('Dolor', {width: 10, align: 'right'}),
], [
  ['sit', 'amet', 'consectetur'],
  ['adipiscing', 'elit', 'sed'],
  ['do', 'eiusmod', 'tempor'],
  ['incididunt', 'ut', 'labore'],
  ['et', 'dolore', 'magna'],
])
differentAlignTabl.headerColor = 33
console.log(differentAlignTabl.toString())
console.log('')
