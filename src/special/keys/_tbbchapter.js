module.exports = {
  desc: 'I\'m battler, and I\'m always battling! Returns a random TBB chapter name.',
  func: function () {
    let poopy = this
    let json = poopy.json
    let { randomChoice } = poopy.functions

    const chapters = { ...json.stageJSON.main, ...json.stageJSON.sub }

    return randomChoice(Object.keys(chapters))
  },
  array: function () {
    let poopy = this
    let json = poopy.json

    const chapters = { ...json.stageJSON.main, ...json.stageJSON.sub }

    return Object.keys(chapters)
  }
}
