module.exports = {
  helpf: '(phrase | replacement | regexp)',
  desc: 'Replaces everything in the phrase that matches the RegExp with the new replacement.',
  func: function (matches) {
    let poopy = this
    let { splitKeyFunc, parseRegExp } = poopy.functions

    var word = matches[1]
    var split = splitKeyFunc(word, { args: 3 })
    var phrase = split[0] ?? ''
    var replacement = split[1] ?? ''
    var reg = split[2] ?? ''
    var regexp = parseRegExp(reg, 'ig')
    return phrase.replace(regexp, replacement)
  },
  parentheses: true
}
