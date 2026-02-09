module.exports = {
  helpf: '(index)',
  desc: 'Returns the ID of the last message in the channel. If index is specified, it returns the ID of the message with that index.',
  func: async function (matches, msg) {
    let poopy = this
    let { parseNumber } = poopy.functions

    var word = matches[1]

    var messages = msg.channel.messages.cache

    var index = parseNumber(word, { dft: 0, min: 0, max: messages.size - 1, round: true })

    return [...messages.values()][index].id
  }
}