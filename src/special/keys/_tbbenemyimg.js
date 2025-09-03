module.exports = {
  desc: 'Returns a random TBB enemy battler image.',
  func: function () {
    let poopy = this
    let json = poopy.json
    let { randomChoice } = poopy.functions

    return randomChoice(json.battlerJSON.enemies).image
  },
  array: function () {
    let poopy = this
    let json = poopy.json

    return json.battlerJSON.enemies.map(b => b.image)
  }
}
