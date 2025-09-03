module.exports = {
  desc: 'I\'m battler, and I\'m always battling! Returns a random TBB battler name.',
  func: function () {
    let poopy = this
    let json = poopy.json
    let { randomChoice } = poopy.functions

    return randomChoice(json.battlerJSON.battlers.concat(json.battlerJSON.enemies)).name
  },
  array: function () {
    let poopy = this
    let json = poopy.json

    return json.battlerJSON.battlers.concat(json.battlerJSON.enemies).map(b => b.name)
  }
}
