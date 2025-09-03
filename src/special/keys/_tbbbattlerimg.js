module.exports = {
  desc: 'I\'m battler, and I\'m always battling! Returns a random TBB battler image.',
  func: function () {
    let poopy = this
    let json = poopy.json
    let { randomChoice } = poopy.functions

    return randomChoice(json.battlerJSON.battlers.concat(json.battlerJSON.enemies)).image
  },
  array: function () {
    let poopy = this
    let json = poopy.json

    return json.battlerJSON.battlers.concat(json.battlerJSON.enemies).map(b => b.image)
  }
}
