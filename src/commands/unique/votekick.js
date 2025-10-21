module.exports = {
    name: ['votekick'],
    args: [
        {
            name: "user",
            required: true,
            specifarg: false,
            orig: "<user>",
            autocomplete: async function (interaction) {
                let poopy = this
                let { data, config } = poopy
                let { dataGather } = poopy.functions

                if (!data.guildData[interaction.guild.id]) {
                    data.guildData[interaction.guild.id] = !config.testing && process.env.MONGODB_URL && await dataGather.guildData(config.database, interaction.guild.id).catch((e) => console.log(e)) || {}
                }

                var memberData = data.guildData[interaction.guild.id].allMembers ?? {}
                var memberKeys = Object.keys(memberData).sort((a, b) => memberData[b].messages - memberData[a].messages)

                return memberKeys.map(id => {
                    return { name: memberData[id].username, value: id }
                })
            }
        },
        { name: "goal", required: false, specifarg: true, orig: "[-goal <votes (default: active members * (3/4))>]" },
        { name: "action", required: false, specifarg: true, orig: "[-action <timeout|kick|ban>]", autocomplete: ["timeout", "kick", "ban"] },
        { name: "duration", required: false, specifarg: true, orig: "[-duration <seconds (default 45)>]" },
    ],
    execute: async function (msg, args) {
        let poopy = this
        let tempdata = poopy.tempdata
        let bot = poopy.bot
        let { resolveUser, getOption, parseNumber, parseString } = poopy.functions
        let { DiscordTypes } = poopy.modules

        const goal = getOption(
            args, 'goal',
            {
                dft: undefined,
                splice: true,
                n: 1,
                join: true,
                func: (opt) => parseNumber(
                    opt, { dft: undefined, min: 0 }
                )
            }
        )

        const action = getOption(
            args, 'action',
            {
                dft: "timeout",
                splice: true,
                n: 1,
                join: true,
                func: (opt) => parseString(
                    opt, ["timeout", "kick", "ban"],
                    { dft: "timeout", lower: true }
                )
            }
        )

        const duration = getOption(
            args, 'duration',
            {
                dft: 45,
                splice: true,
                n: 1,
                join: true,
                func: (opt) => parseNumber(
                    opt, { dft: 45, min: 0, max: 300 }
                )
            }
        )

        const permissions = msg.member.permissions
        const isPoopyOwner = config.ownerids.find(id => id == msg.author.id)

        if (!isPoopyOwner) {
            if (action == "ban" && !permissions.has(DiscordTypes.PermissionFlagsBits.BanMembers)) {
                await msg.reply("You don't have permissions to use the ban action.").catch(() => {})
                return
            }
    
            if (action == "kick" && !permissions.has(DiscordTypes.PermissionFlagsBits.KickMembers)) {
                await msg.reply("You don't have permissions to use the kick action.").catch(() => {})
                return
            }
    
            if (action == "timeout" && !permissions.has(DiscordTypes.PermissionFlagsBits.ModerateMembers)) {
                await msg.reply("You don't have permissions to use the timeout action.").catch(() => {})
                return
            }
        }

        var userQuery = args.slice(1).join(' ')

        var member = userQuery ? await resolveUser(userQuery, msg.guild, "member").catch(() => {}) : msg.author

        if (!member) {
            await msg.reply({
                content: `Invalid member: **${userQuery}**`,
                allowedMentions: fetchPingPerms(msg)
            }).catch(() => {})
            return
        }
        
        return await votekick(member, channel, goal, action, duration * 1000)
    },
    help: {
        name: 'votekick <user> [-goal <votes (default: active members * (3/4))>] [-action <timeout|kick|ban>] [-duration <seconds (default 45)>] (moderator only)',
        value: 'Starts a votekick on the specified user. When the goal is reached, it executes an action on them, by default a 10 minute timeout.'
    },
    cooldown: 2500,
    perms: [
        'Administrator',
        'ModerateMembers',
        'KickMembers',
        'BanMembers'
    ],
    type: 'Unique'
}
