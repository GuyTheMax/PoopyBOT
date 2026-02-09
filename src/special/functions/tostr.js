module.exports = {
    helpf: '(num | radix)',
    desc: 'Converts a number into a string using the specified radix.',
    func: function (matches) {
        let poopy = this
        let { splitKeyFunc, parseNumber } = poopy.functions

        var word = matches[1]
        var split = splitKeyFunc(word, { args: 2 })

        var num = Number(split[0])
        var radix = parseNumber(split[1], { dft: 10, min: 2, max: 36, round: true })

        var str = !isNaN(num) ? num.toString(radix) : ""
        return str
    }
}