module.exports = {
  desc: 'Returns a random message from the server. Requires permission for the bot to read messages within channels.',
  func: function (msg) {
    let poopy = this
    let tempdata = poopy.tempdata

    var messages = tempdata[msg.guild.id].messages.map(m => m.content)
    return messages.length ? messages[Math.floor(Math.random() * messages.length)] : ''
  },
  array: function (msg) {
    let poopy = this
    let tempdata = poopy.tempdata

    var messages = tempdata[msg.guild.id].messages.map(m => m.content)
    return messages
  }
}