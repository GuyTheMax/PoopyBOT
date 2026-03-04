module.exports = {
    desc: "Returns whether the bot has been mentioned in the message or not.", func: async function (msg) {
        let poopy = this
        let bot = poopy.bot

        return !!msg.mentions.has(bot.user.id) || ''
    }
}