const ELIPSIS_CHAR = '…'
const BLANK_CHAR = ' '
const EMPTY = ''
const LEFT = 'left'
const RIGHT = 'right'

class Gridy {
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

  _headerString() {
    if (!this.columns) return EMPTY
    return this.columns.map(column => {
      return this._fitWithin(column.header, column.width, column.align)
    }).join(this._spaceChar)
  }

  _rowStrings() {
    if (!this.rows) return EMPTY
    return this.rows.map(row => {
      return row.map((el,i) => {
        return this._fitWithin(el.toString(), this.columns[i].width, this.columns[i].align)
      }).join(this._spaceChar)
    })
  }

  _toArray() {
    let leftShift = ''
    while (leftShift.length < this.leftShiftWidth) leftShift += this._spaceChar
    return [
      leftShift + this._colorize(this.headerColorCode, this._headerString()),
      this._spaceChar, // separates header from rows
    ].concat(this._rowStrings().map(rowString => leftShift + rowString))
  }

  _fitWithin(el, width, align) {
    let chars = el.split(EMPTY)
    while (chars.length > width) {
      chars.pop()
    }
    while (chars.length < width) {
      if (align === LEFT) chars.push(this._spaceChar)
      if (align === RIGHT) chars.unshift(this._spaceChar)
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
  constructor(header, width, options) {
    options = Object.assign({
      align: LEFT
    }, options)
    if (width === null || width === undefined) {
      this.width = header.length
    }
    if (width <= 0) {
      throw 'width must be greater than zero'
    }
    if ([LEFT, RIGHT].indexOf(options.align.toLowerCase()) < 0) {
      throw 'align must be left or right'
    }
    this.header = header
    this.width = width
    this.align = options.align
  }
}

Gridy.Column = Column

module.exports = Gridy
