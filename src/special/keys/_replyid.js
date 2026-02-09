module.exports = {
    desc: 'Returns the ID of the message\'s original reply in case it exists.',
    func: async function (msg) {
      return msg.reference?.messageId ?? ""
    }
  }