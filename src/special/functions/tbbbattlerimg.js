module.exports = {
    helpf: '(battler | enemyFirst)',
    desc: 'Returns the image corresponding to the TBB battler.',
    func: function (matches) {
        let poopy = this
        let json = poopy.json
        let { splitKeyFunc } = poopy.functions

        var word = matches[1]
        var [ battler, enemyFirst ] = splitKeyFunc(word, { args: 2 })

        var battlerData = [json.battlerJSON.battlers, json.battlerJSON.enemies]
        if (enemyFirst) battlerData = battlerData.reverse()
        
        var battlers = battlerData.flat()

        var findBattler = battlers.find(b => b.name.toLowerCase() == battler.toLowerCase().trim()) || ''

        return findBattler.image
    }
}