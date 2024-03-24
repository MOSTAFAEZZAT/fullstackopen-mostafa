const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url).then(result => {
    console.log('connected to MongoDB')
}).catch(error => {
    console.log('there is an issue in connecting', error.message)
})

const personScehma = mongoose.Schema({
    name: String,
    number: String,
})

personScehma.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports = mongoose.model('Person', personScehma)     