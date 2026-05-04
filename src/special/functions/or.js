module.exports = {
  helpf: '(phrase1 | phrase2 | phrase3 | etc...)',
  desc: "Returns the first phrase that isn't blank.",
  func: async function (matches, msg, isBot, _, opts) {
    let poopy = this
    let { splitKeyFunc, getKeywordsFor } = poopy.functions

    var word = matches[1]
    var split = splitKeyFunc(word)
    var or = ''
    for (var i in split) {
      var phrase = (await getKeywordsFor(split[i], msg, isBot, opts).catch(() => { }) ?? '').trim()
      if (phrase) return phrase
    }
    return ''
  },
  raw: true
}