const ELIPSIS_CHAR = '…'
const BLANK_CHAR = ' '
const EMPTY = ''
const LEFT = 'left'
const RIGHT = 'right'
const CENTER = 'center'

class Tabl {
  constructor(columns, rows, options) {
    options = Object.assign({
      leftShiftWidth: 2,
      headerColorCode: null,
      _spaceChar: BLANK_CHAR // override for testing
    }, options)
    this.columns = columns
    this.rows = rows
    this.headerColorCode = options.headerColorCode
    this.leftShiftWidth = options.leftShiftWidth
    this._spaceChar = options._spaceChar
  }

  set headerColor(code) {
    this.headerColorCode = code
  }

  get headerColor() {
    return this.headerColorCode
  }

  set leftShift(width) {
    this.leftShiftWidth = width
  }

  get leftShift() {
    return this.leftShiftWidth
  }

  toString() {
    return this._toArray().join('\n')
  }

  _headerEls() {
    if (!this.columns) return EMPTY
    return this.columns.map(column => {
      return this._fitWithin(column.header, column.width, column.align)
    })
  }

  _rowsEls() {
    if (!this.rows) return EMPTY
    return this.rows.map(row => {
      return row.map((el,i) => {
        return this._fitWithin(el.toString(), this.columns[i].width, this.columns[i].align)
      })
    })
  }

  _toArray() {
    let leftShift = ''
    while (leftShift.length < this.leftShiftWidth) leftShift += this._spaceChar
    let hEls = this._headerEls()
    let bars = []
    hEls.forEach(el => {
      let str = ''
      while(str.length < el.length) str += '─'
      bars.push(str)
    })
    hEls = hEls.map(el => this._colorize(this.headerColorCode, el))
    let allREls = []
    this._rowsEls().forEach(rEl => {
      allREls.push(leftShift + '├' + bars.join('┼') + '┤')
      allREls.push(leftShift + '│' +  rEl.join('│') + '│')
    })

    return [
      leftShift + '┌' + bars.join('┬') + '┐',
      leftShift + '│' + hEls.join('│') + '│',
    ].concat(allREls).concat([
      leftShift + '└' + bars.join('┴') + '┘',
    ])
  }

  _fitWithin(el, width, align) {
    let chars = el.split(EMPTY)
    while (chars.length > width) {
      chars.pop()
    }
    while (chars.length < width) {
      if (align === LEFT) chars.push(this._spaceChar)
      if (align === RIGHT) chars.unshift(this._spaceChar)
      if (align === CENTER) {
        if (chars.length % 2 === 0) chars.push(this._spaceChar)
        if (chars.length % 2 === 1) chars.unshift(this._spaceChar)
      }
    }
    if (chars.length < el.length) {
      chars[chars.length-1] = ELIPSIS_CHAR
    }
    return chars.join(EMPTY)
  }

  _colorize(code, str) {
    if (code === null) return str
    return '\x1b[' + code + 'm' + str + '\x1b[0m'
  }
}

class Column {
  constructor(header, options) {
    options = Object.assign({
      width: null,
      align: LEFT
    }, options)
    if (options.width === null || options.width === undefined) {
      options.width = header.length
    }
    if (options.width <= 0) {
      throw 'width must be greater than zero'
    }
    if ([LEFT, RIGHT, CENTER].indexOf(options.align.toLowerCase()) < 0) {
      throw 'align must be left, right, or center'
    }
    this.header = header
    this.width = options.width
    this.align = options.align
  }
}

Tabl.Column = Column

module.exports = Tabl
