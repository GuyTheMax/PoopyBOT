module.exports = {
  helpf: '(name | seed)',
  desc: 'Creates a random generator function given the name and seed. Functions can be used by typing in [functionname].',
  func: function (matches, msg, _, string) {
    let poopy = this
    let { splitKeyFunc, regexClean, xmur3, mulberry32 } = poopy.functions
    let tempdata = poopy.tempdata

    var word = matches[1]
    var fullword = `${matches[0]}(${matches[1]})`
    var phrase = string.replace(new RegExp(`${regexClean(fullword)}\\s*`, 'i'), '')
    var split = splitKeyFunc(word, { args: 2 })

    var name = split[0]
    var seed = split[1]

    var seedFn = xmur3(seed)
    var rand = mulberry32(seedFn())

    tempdata[msg.author.id][msg.id].declared[`[${name}]`] = seed
    tempdata[msg.author.id][msg.id].funcDeclared[`[${name}]`] = {
      func: async function (matches) {
        var word = matches[1]
        var split = splitKeyFunc(word, { args: 2 })
        if (split.length <= 1 && split[0] == '') return rand()
        var min = Math.round(Number(split[0])) || 0
        var max = Math.round(Number(split[1])) || 0
        return Math.floor(rand() * (max + 1 - min)) + min
      },
      declared: true
    }

    return [phrase, true]
  }
}