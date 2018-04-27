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
      showBorder: false,
      _spaceChar: BLANK_CHAR // override for testing
    }, options)
    this.columns = columns
    this.rows = rows
    this.headerColorCode = options.headerColorCode
    this.leftShiftWidth = options.leftShiftWidth
    this.border = options.showBorder
    this._spaceChar = options._spaceChar
  }

  set showBorder(border) {
    this.border = border
  }

  get showBorder() {
    return this.border
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
    let shift = ''
    while (shift.length < this.leftShiftWidth) shift += this._spaceChar
    return this._toArray(this.border).map(a => shift + a).join('\n')
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

  _toArray(border) {
    let hEls = this._headerEls()
    hEls = hEls.map(el => this._colorize(this.headerColorCode, el))
    if (!border) {
      return [
        hEls.join(this._spaceChar),
      ].concat(this._rowsEls().map(row => row.join(this._spaceChar)))
    }
    let bars = this._bars('━')
    return [
              '┏' + bars.join('┳') + '┓',
              '┃' + hEls.join('┃') + '┃',
    ].concat(this._rowsEls().reduce((rs,r) => {
      rs.push('┣' + bars.join('╋') + '┫')
      rs.push('┃' +    r.join('┃') + '┃')
      return rs
    }, [])).concat([
              '┗' + bars.join('┻') + '┛',
    ])
  }

  _bars(barChar) {
    return this.columns.reduce((bs, col) => {
      let str = ''
      while(str.length < col.width) str += barChar
      return bs.concat([str])
    }, [])
  }

  _fitWithin(el, width, align) {
    let chars = el.split(EMPTY)
    while (chars.length > width) chars.pop()
    while (chars.length < width) {
      if (align === LEFT || (align === CENTER && chars.length % 2 === 0)) {
        chars.push(this._spaceChar)
      } else chars.unshift(this._spaceChar)
    }
    if (chars.length < el.length) chars[chars.length-1] = ELIPSIS_CHAR
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
