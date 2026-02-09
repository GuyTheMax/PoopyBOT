module.exports = {
    desc: 'Returns a random US house address.',
    func: function () {
        let poopy = this
        let { randomAddress } = poopy.functions

        return randomAddress()
    }
}