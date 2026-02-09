module.exports = {
    helpf: '(chapter | order)',
    desc: 'Returns a stage from the corresponding TBB chapter at the specified order, random if not specified.',
    func: function (matches) {
        let poopy = this
        let json = poopy.json
        let { splitKeyFunc, parseNumber } = poopy.functions

        var word = matches[1]
        var split = splitKeyFunc(word, { args: 2 })

        var chapter = split[0]

        var chapters = { ...json.stageJSON.main, ...json.stageJSON.sub }
        var stages = chapters[chapter]
        if (!stages) return ""

        var order = parseNumber(split[1], { dft: Math.floor(Math.random() * stages.length) + 1, min: 1, max: stages.length, round: true })

        return stages[order - 1].name
    }
}