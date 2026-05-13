module.exports = {
  helpf: '(phrase)',
  desc: 'Cleans content in the phrase such as user/role mentions and channels, but preserves emojis.',
  func: function (matches, msg) {
    let poopy = this
    let { cleanContentPreserveEmojis } = poopy.functions

    var word = matches[1]
    return cleanContentPreserveEmojis(word, msg.channel)
  }
}