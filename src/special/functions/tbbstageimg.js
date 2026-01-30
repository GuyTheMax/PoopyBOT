module.exports = {
    helpf: '(stage | isTumore)',
    desc: 'Returns the image corresponding to the TBB stage.',
    func: function (matches) {
        let poopy = this
        let json = poopy.json
        let { splitKeyFunc } = poopy.functions

        var word = matches[1]
        var [ stage, isTumore ] = splitKeyFunc(word, { args: 2 })

        var stages = Object.values({ ...json.stageJSON.main, ...json.stageJSON.sub }).flat()

        var findStage = stages.find(s => s.name.toLowerCase() == stage.toLowerCase().trim())

        return findStage ? json.stageJSON.thumbnails[findStage.image][!isTumore ? "normal" : "tumore"] : ""
    }
}