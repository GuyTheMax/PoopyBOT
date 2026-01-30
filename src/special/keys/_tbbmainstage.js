module.exports = {
  desc: 'I\'m battler, and I\'m always battling! Returns a random TBB main chapter stage name.',
  func: function () {
    let poopy = this
    let json = poopy.json
    let { randomChoice } = poopy.functions

    const chapters = json.stageJSON.main

    return randomChoice(Object.values(chapters).flat()).name
  },
  array: function () {
    let poopy = this
    let json = poopy.json

    const chapters = json.stageJSON.main

    return Object.values(chapters).flat().map(b => b.name)
  }
}
