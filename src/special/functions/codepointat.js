module.exports = {
  helpf: '(character | index)',
  desc: 'Returns the codepoint of the Unicode character at the specified index.',
  func: function (matches) {
    let poopy = this
    let { splitKeyFunc } = poopy.functions
    
    var word = matches[1]
    var split = splitKeyFunc(word, { args: 2 })

    return split[0].codePointAt(Math.round(Number(split[1] ?? split[0].length - 1)))
  }
}
