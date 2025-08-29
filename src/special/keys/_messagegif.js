module.exports = {
  desc: 'Returns a random GIF sent in the server. Requires permission for the bot to read messages within channels.',
  func: function (msg) {
    let poopy = this
    let tempdata = poopy.tempdata
    let data = poopy.data
    let vars = poopy.vars
    let { randomChoice } = poopy.functions
    
    var validURL = new RegExp(`${vars.validUrl.source}\\.(gif|apng)`, 'g')

    var messages = tempdata[msg.guild.id].messages.concat(
      Object.entries(data.guildData[msg.guild.id].channels).map(
        ([channelId, channel]) => data.guildData[msg.guild.id].read.includes(channelId) ? channel.lastUrls : null
      ).filter(Boolean).flat()
    ).map(m => (m.content ?? m).match(validURL)).filter(Boolean).flat()
    
    return messages.length ? randomChoice(messages) : ''
  },
  array: function (msg) {
    let poopy = this
    let tempdata = poopy.tempdata
    let data = poopy.data
    let vars = poopy.vars
    
    var validURL = new RegExp(`${vars.validUrl.source}\\.(gif|apng)`, 'g')

    var messages = tempdata[msg.guild.id].messages.concat(
      Object.entries(data.guildData[msg.guild.id].channels).map(
        ([channelId, channel]) => data.guildData[msg.guild.id].read.includes(channelId) ? channel.lastUrls : null
      ).filter(Boolean).flat()
    ).map(m => (m.content ?? m).match(validURL)).filter(Boolean).flat()
    
    return messages
  }
}
