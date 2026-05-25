module.exports = {
    helpf: '(id | json) (manage messages only)',
    desc: 'Edits a message sent by the bot, but also allowing you to specify a custom payload.',
    func: async function (matches, msg, isBot, _, opts) {
        let poopy = this
        let { splitKeyFunc, fetchPingPerms, tryJSONparse, parseKeywords } = poopy.functions
        let { DiscordTypes } = poopy.modules
        let config = poopy.config
        let bot = poopy.bot
        let tempfiles = poopy.tempfiles

        var jopts = { ...opts }
        jopts.declaredOnly = true

        var word = matches[1]
        var split = splitKeyFunc(word, { args: 2 })
        var id = await parseKeywords(split[0], msg, isBot, opts).catch((e) => console.log(e)) ?? split[0]
        var phrase = await parseKeywords(split[1], msg, isBot, jopts).catch((e) => console.log(e)) ?? split[1]

        if (msg.channel.permissionsFor(msg.member).has(DiscordTypes.PermissionFlagsBits.ManageGuild) || msg.channel.permissionsFor(msg.member).has(DiscordTypes.PermissionFlagsBits.ManageMessages) || msg.member.permissions.has(DiscordTypes.PermissionFlagsBits.Administrator) || msg.author.id === msg.guild.ownerId || config.ownerids.find(id => id == msg.author.id) || isBot) {
            var messages = msg.channel.messages

            var messageToEdit = messages.cache.get(id) ?? messages.fetch(id)
            if (messageToEdit.catch) messageToEdit = await messageToEdit.catch(() => { })

            if (messageToEdit) {
                if (messageToEdit.author.id !== bot.user.id) {
                    return ''
                }

                var payload = tryJSONparse(phrase)
                if (!payload) return 'Malformatted payload JSON.'

                payload.allowedMentions = fetchPingPerms(msg)

                if (payload.files) payload.files.filter(file => {
                    return file.attachment.match(vars.validUrl) || file.attachment.match(/temp:[a-zA-Z0-9_-]{10}/g)
                }).map(file => {
                    if (!file.attachment.match(/^temp:[a-zA-Z0-9_-]{10}$/)) return file

                    var id = file.attachment.substring(5)
                    var tempfile = tempfiles[id]

                    if (!tempfile) return file

                    file.attachment = `tempfiles/${config.database}/${tempfile.name}`

                    return file
                })

                var doingitwrong = ''
                await (msg?.isUserApp ? msg.editReply : messageToEdit.edit).call(msg?.isUserApp ? msg : messageToEdit, payload).catch((err) => { doingitwrong = err.message })

                if (doingitwrong !== '')
                    return doingitwrong
            }
        } else {
            return 'You need to have the manage messages permission to execute that!'
        }

        return ''
    },
    attemptvalue: 5,
    raw: true
}