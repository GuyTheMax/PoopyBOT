module.exports = {
    desc: 'Returns a random image.',
    func: function () {
        let poopy = this
        let json = poopy.json

        var imageJSON = json.imageJSON
        var image = imageJSON.data[Math.floor(Math.random() * imageJSON.data.length)]
        
        return 'https://randomwordgenerator.com' + image.image_url
    },
    array: function () {
        let poopy = this
        let json = poopy.json

        var imageJSON = json.imageJSON

        return imageJSON.data.map(image => 'https://randomwordgenerator.com' + image.image_url)
    },
    cmdconnected: 'randomimage'
}