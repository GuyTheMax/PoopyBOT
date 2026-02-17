module.exports = {
  helpf: '(id)',
  desc: 'Returns the ID of the author of the message with that ID in the channel.',
  func: async function (matches, msg) {
    var f = matches[0]
    var id = matches[1]

    var messages = msg.channel.messages

    var message = messages.cache.get(id) ?? await messages.fetch(id).catch(() => { })

    return (message?.author?.id ?? '')
  }
}
