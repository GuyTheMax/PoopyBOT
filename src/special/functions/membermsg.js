module.exports = {
    helpf: '(id)',
    desc: 'Returns a random message from a member in the server. Requires permission for the bot to read messages within channels.',
    func: function (matches, msg) {
        let poopy = this
        let tempdata = poopy.tempdata

        var word = matches[1]

        var messages = tempdata[msg.guild.id].messages.filter(message => message.author == word).map(m => m.content)
        return messages.length ? messages[Math.floor(Math.random() * messages.length)] : ''
    }
}