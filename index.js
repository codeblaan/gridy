const elipsisChar = '…'
const blankChar = ' '
const leftShiftWidth = 2
const LEFT = 'left'
const RIGHT = 'right'

class Gridy {
  constructor(columns, rows, options) {
    options = options || {}
    this.columns = columns
    this.rows = rows
    this.spaceChar = options.spaceChar || blankChar
    this.headerColorCode = null
    if (options.leftShiftWidth >= 0) {
      this.leftShiftWidth = options.leftShiftWidth
    } else {
      this.leftShiftWidth = leftShiftWidth
    }
  }

  setHeaderColor(code) {
    this.headerColorCode = code
  }

  toString() {
    return this._toRows().join('\n')
  }

  _fitWithin(el, width, align, emptyChar) {
    if (emptyChar === undefined) emptyChar = this.spaceChar
    let block = []
    for (let i = 0; i < width; i++) {
      let c = el.charAt(i)
      if (c === '') {
        if (align === RIGHT) {
          block.unshift(emptyChar)
        } else {
          block.push(emptyChar)
        }
      } else {
        block.push(c)
      }
    }
    if (block.length < el.length) {
      if (el[el.length] !== blankChar) {
        block[block.length-1] = elipsisChar
      }
    }
    return block.join('')
  }

  _headerString() {
    let str = ''
    for (let i = 0; i < this.columns.length; i++) {
      str += this._fitWithin(this.columns[i].header, this.columns[i].width, this.columns[i].align)
      if (i !== this.columns.length-1) {
        str += this.spaceChar
      }
    }
    return str
  }

  _rowStrings() {
    let strs = []
    if (!this.rows || this.rows.length === 0) return []
    for (let i = 0; i < this.rows.length; i++) {
      let str = ''
      let row = this.rows[i]
      for (let j = 0; j < row.length; j++) {
        const el = row[j].toString()
        str += this._fitWithin(el, this.columns[j].width, this.columns[j].align)
        if (j !== row.length-1) {
          str += this.spaceChar
        }
      }
      strs.push(str)
    }
    return strs 
  }

  _toRows() {
    let strRows = []
    let leftShift = ''
    for (let i = 0; i < this.leftShiftWidth; i++) {
      leftShift += this.spaceChar
    }
    strRows.push(leftShift + this._colorize(this.headerColorCode, this._headerString()))
    strRows.push(this.spaceChar)
    this._rowStrings().forEach(rowString => {
      strRows.push(leftShift + rowString)
    })
    return strRows
  }

  _colorize(code, str) {
    if (code === null || code === undefined) return str
    return '\x1b[' + code + 'm' + str + '\x1b[0m'
  }
}

class Column {
  constructor(header, width, options) {
    options = options || {}
    try {
      if (header === null || header === undefined || header.length === 0) {
        throw 'header must be set'
      }
      if (width === null || width === undefined) {
        width = header.length
      }
      if (width <= 0) {
        throw 'width must be greater than zero'
      }
      this.align = options.align || LEFT
      if ([LEFT, RIGHT].indexOf(this.align.toLowerCase()) < 0) {
        throw 'align must be left or right'
      }
      this.header = header
      this.width = width
    } catch(e) {
      throw 'invalid args for Column', e
    }
  }
}

Gridy.Column = Column

module.exports = Gridy
