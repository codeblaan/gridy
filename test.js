const assert = require('assert');
const Tabl = require('.')

describe('Tabl', () => {
  it('should render a normal tabl', () => {
    const tabl = new Tabl([
      new Tabl.Column('header1', {width: 10}),
      new Tabl.Column('header2', {width: 12})
    ], [
      ['item1', 'item2'],
      ['item3', 'item4']
    ], {
      leftShiftWidth: 0,
      _spaceChar: '@' // use instead for testing
    })

    const actualRows = tabl.toString().split('\n')

    assert.equal(actualRows[0], 'header1@@@@header2@@@@@')
    assert.equal(actualRows[1], '@')
    assert.equal(actualRows[2], 'item1@@@@@@item2@@@@@@@')
    assert.equal(actualRows[3], 'item3@@@@@@item4@@@@@@@')
  })

  it('should abbreviate rows if they do not fit inside', () => {
    const tabl = new Tabl([
      new Tabl.Column('header1', {width: 7}),
    ], [
      ['itemiswaaaytobig']
    ], {
      leftShiftWidth: 0,
      _spaceChar: '@'
    })

    const actualRows = tabl.toString().split('\n')

    assert.equal(actualRows[0], 'header1')
    assert.equal(actualRows[1], '@')
    assert.equal(actualRows[2], 'itemis…')
  })

  it('should abbreviate header if they do not fit inside width', () => {
    const tabl = new Tabl([
      new Tabl.Column('headerissuperlong', {width: 5}),
    ], [
      ['item1']
    ], {
      leftShiftWidth: 0,
      _spaceChar: '@'
    })

    const actualRows = tabl.toString().split('\n')

    assert.equal(actualRows[0], 'head…')
    assert.equal(actualRows[1], '@')
    assert.equal(actualRows[2], 'item1')
  })

  it('can render elements aligned to the right', () => {
    const tabl = new Tabl([
      new Tabl.Column('number1', {width: 9, align: 'right'}),
      new Tabl.Column('number2', {width: 9, align: 'right'})
    ], [
      [20.34, '23.90'],
      ['80.32', '3.23']
    ], {
      leftShiftWidth: 0,
      _spaceChar: '@'
    })

    const actualRows = tabl.toString().split('\n')

    assert.equal(actualRows[0], '@@number1@@@number2')
    assert.equal(actualRows[1], '@')
    assert.equal(actualRows[2], '@@@@20.34@@@@@23.90')
    assert.equal(actualRows[3], '@@@@80.32@@@@@@3.23')
  })

  it('should render just the headers if no rows', () => {
    const tabl = new Tabl([
      new Tabl.Column('header', {width: 7}),
    ], [
      // no rows
    ],{
      leftShiftWidth: 0,
      _spaceChar: '@'
    })

    const actualRows = tabl.toString().split('\n')

    assert.equal(actualRows[0], 'header@')
  })

  it('defaults width to length of header when not given', () => {
    const tabl = new Tabl([
      new Tabl.Column('header'),
    ], [
      ['item1'],
      ['item2']
    ],{
      leftShiftWidth: 0,
      _spaceChar: '@'
    })

    const actualRows = tabl.toString().split('\n')

    assert.equal(actualRows[0], 'header')
    assert.equal(actualRows[1], '@')
    assert.equal(actualRows[2], 'item1@')
    assert.equal(actualRows[3], 'item2@')
  })

  it('should shift tabl over when given shift width greater than 0', () => {
    const tabl = new Tabl([
      new Tabl.Column('header'),
    ], [
      ['item1'],
      ['item2']
    ],{
      leftShiftWidth: 3,
      _spaceChar: '@'
    })

    const actualRows = tabl.toString().split('\n')

    assert.equal(actualRows[0], '@@@header')
    assert.equal(actualRows[1], '@')
    assert.equal(actualRows[2], '@@@item1@')
    assert.equal(actualRows[3], '@@@item2@')
  })
})
