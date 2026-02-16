module.exports = {
    helpf: '(arrayName | val)',
    desc: 'Returns the index of the value if the array includes it.',
    func: async function (matches, msg) {
        let poopy = this
        let { splitKeyFunc } = poopy.functions
        let tempdata = poopy.tempdata

        var word = matches[1]
        var split = splitKeyFunc(word, { args: 2 })
        var name = split[0] ?? ''
        var val = split[1] ?? ''

        var array = tempdata[msg.author.id][msg.id].arrays[name]
        if (!array) return ''

        return array.indexOf(val)
    }
}
