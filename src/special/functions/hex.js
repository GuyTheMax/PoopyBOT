module.exports = {
  helpf: '(r g b)',
  desc: 'Converts the supplied RGB values to HEX.',
  func: function (matches) {
    var word = matches[1]
    var parts = word.split(/\s+/).map(Number)

    if (parts.length !== 3 || parts.some(v => isNaN(v) || v < 0 || v > 255)) {
      return '000000'
    }

    return (
      parts
        .map(v => v.toString(16).padStart(2, '0'))
        .join('')
    )
  }
}
