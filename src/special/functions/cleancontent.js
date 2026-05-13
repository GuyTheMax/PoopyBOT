module.exports = {
  helpf: '(phrase)',
  desc: 'Cleans content in the phrase such as user/role mentions, channels, and emojis.',
  func: function (matches, msg) {
    let poopy = this
    let { Discord } = poopy.modules

    var word = matches[1]
    return Discord.Util.cleanContent(word, msg)
  }
}