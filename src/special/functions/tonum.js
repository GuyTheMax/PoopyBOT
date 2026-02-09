module.exports = {
    helpf: '(str | radix)',
    desc: 'Converts a string into a number using the specified radix.',
    func: function (matches) {
        let poopy = this
        let { splitKeyFunc, parseNumber } = poopy.functions

        var word = matches[1]
        var split = splitKeyFunc(word, { args: 2 })

        var text = String(split[0] ?? "")
        var radix = parseNumber(split[1], { dft: 10, min: 2, max: 36, round: true })

        var num = parseInt(text, radix)
        return !isNaN(num) ? num : ""
    }
}
