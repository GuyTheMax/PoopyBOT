module.exports = {
  desc: 'Returns a random TBB enemy battler name.',
  func: function () {
    let poopy = this
    let json = poopy.json
    let { randomChoice } = poopy.functions

    return randomChoice(json.battlerJSON.enemies).name
  },
  array: function () {
    let poopy = this
    let json = poopy.json

    return json.battlerJSON.enemies.map(b => b.name)
  }
}
