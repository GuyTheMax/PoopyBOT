module.exports = {
    desc: 'Returns a random image description.',
    func: function () {
        let poopy = this
        let json = poopy.json

        var imageJSON = json.imageJSON
        var image = imageJSON.data[Math.floor(Math.random() * imageJSON.data.length)]
        
        return image.description
    },
    array: function () {
        let poopy = this
        let json = poopy.json

        var imageJSON = json.imageJSON

        return imageJSON.data.map(image => image.description)
    },
    cmdconnected: 'randomimage'
}