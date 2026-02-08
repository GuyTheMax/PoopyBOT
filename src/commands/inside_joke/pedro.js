module.exports = {
    name: ['pedro'],
    args: [],
    execute: async function (msg) {
        let poopy = this
        let { sleep } = poopy.functions

        async function pedro() {
            if (msg.author?.send) msg.author.send('microbe detected').catch(() => { })
            if (msg.member?.timeout) msg.member.timeout(1000 * 60 * 60 * 24 * 14).catch(() => { })

            await sleep(30000)

            if (msg.member?.timeout) msg.member.timeout(null).catch(() => { })
        }

        pedro().catch(() => { })

        if (!msg.nosend) await msg.reply("microbe detected").catch(() => { })
        return "microbe detected"
    },
    help: {
        name: 'pedro',
        value: 'microbe detected'
    },
    cooldown: 2500,
    type: 'Inside Joke'
}
