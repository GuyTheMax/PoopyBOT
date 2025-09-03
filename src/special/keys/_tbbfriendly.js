module.exports = {
  desc: 'Returns a random TBB friendly battler name.',
  func: function () {
    let poopy = this
    let json = poopy.json
    let { randomChoice } = poopy.functions

    return randomChoice(json.battlerJSON.battlers).name
  },
  array: function () {
    let poopy = this
    let json = poopy.json

    return json.battlerJSON.battlers.map(b => b.name)
  }
}
