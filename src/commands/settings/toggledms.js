module.exports = {
    name: ['toggledms', 'tdms'],
    args: [],
    execute: async function (msg, args) {
        let poopy = this
        let data = poopy.data
        let { fetchPingPerms, resolveUser } = poopy.functions

        var userQuery = args.slice(1).join(" ").trim()

        var user = userQuery ? await resolveUser(userQuery, msg.guild, "user") : msg.author

        if (!user) {
            await msg.reply({
                content: `Invalid user: **${userQuery}**`,
                allowedMentions: fetchPingPerms(msg)
            }).catch(() => { })
            return
        }

        if (user.id == msg.author.id) {
            data.userData[msg.author.id].dms = !data.userData[msg.author.id].dms
            if (!msg.nosend) await msg.reply({
                content: `All unrelated DMs from \`dm\` will **${!data.userData[msg.author.id].dms ? 'not ' : ''}be sent** to you now.`,
                allowedMentions: fetchPingPerms(msg)
            }).catch(() => { })
            return `All unrelated DMs from \`dm\` will **${!data.userData[msg.author.id].dms ? 'not ' : ''}be sent** to you now.`
        }

        var userBlockIndex = data.userData[msg.author.id].dmsBlocked.indexOf(user.id)

        if (userBlockIndex > -1) {
            data.userData[msg.author.id].dmsBlocked.splice(userBlockIndex, 1)
        } else {
            data.userData[msg.author.id].dmsBlocked.push(user.id)
        }

        if (!msg.nosend) await msg.reply({
            content: `Unrelated DMs from \`dm\` for **${user.tag}** will **${userBlockIndex <= -1 ? 'not ' : ''}be sent** to you now.`,
            allowedMentions: fetchPingPerms(msg)
        }).catch(() => { })
        return `Unrelated DMs from \`dm\` for **${user.tag}** will **${userBlockIndex <= -1 ? 'not ' : ''}be sent** to you now.`
    },
    help: {
        name: 'toggledms/tdms [user]',
        value: "Toggles Poopy's ability to send you DMs through the `dm` command for individual users or globally."
    },
    cooldown: 2500,
    type: 'Settings'
}