module.exports = {
    helpf: '(chapter)',
    desc: 'Returns a random stage from the corresponding TBB chapter.',
    func: function (matches) {
        let poopy = this
        let json = poopy.json
        let { randomChoice } = poopy.functions

        var chapter = matches[1]

        var chapters = Object.entries({ ...json.stageJSON.main, ...json.stageJSON.sub })
        if (!chapters[chapter]) return ""

        return randomChoice(chapters[chapter]).name
    }
}