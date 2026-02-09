module.exports = {
    helpf: '(text | length | pad)',
    desc: 'Pads the end of a string until it reaches the given length.',
    func: function (matches) {
        let poopy = this
        let { splitKeyFunc, parseNumber } = poopy.functions

        var word = matches[1]
        var split = splitKeyFunc(word, { args: 3 })

        var text = String(split[0] ?? "")
        var length = parseNumber(split[1], { dft: text.length, min: 0, round: true })
        var pad = split[2] !== undefined ? String(split[2]) : " "

        return text.padEnd(length, pad)
    }
}
