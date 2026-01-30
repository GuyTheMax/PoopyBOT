module.exports = {
    helpf: '(stage)',
    desc: 'Returns the order of the TBB stage according to its chapter.',
    func: function (matches) {
        let poopy = this
        let json = poopy.json

        var stage = matches[1]

        var chapters = Object.entries({ ...json.stageJSON.main, ...json.stageJSON.sub })

        var findChapter = chapters.find(([_, stages]) => stages.some(s => s.name.toLowerCase() == stage.toLowerCase().trim()))

        return findChapter ? findChapter[1].findIndex(s => s.name.toLowerCase() == stage.toLowerCase().trim()) + 1 : ""
    }
}