module.exports = {
  helpf: '(text)',
  desc: `Uses an AutoMod filter preset to remove naughty terms from the text.`,
  func: function (matches) {
    let poopy = this
    let json = poopy.json
    let { autoModContent } = poopy.functions

    var word = matches[1]

    var [_, maskedContent] = autoModContent(word, json.autoModJSON)

    return maskedContent
  }
}