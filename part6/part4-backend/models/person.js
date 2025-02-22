const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url).then(result => {
  console.log('connected to MongoDB', result)
}).catch(error => {
  console.log('there is an issue in connecting', error.message)
})

const personScehma = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{3}|\d{2}-?\d$/.test(v)
      },
    },
  }
})

personScehma.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Person', personScehma)