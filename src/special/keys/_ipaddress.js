module.exports = {
    desc: 'Returns a random IP address.',
    func: function () {
        let dec = () => Math.floor(Math.random() * 256)
        return `${dec()}.${dec()}.${dec()}.${dec()}`
    }
}