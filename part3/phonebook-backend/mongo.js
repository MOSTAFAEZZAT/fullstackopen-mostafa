const mongoose = require('mongoose')

const password = process.argv[2]

mongoose.set('strictQuery', false)

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Phonebook', phonebookSchema)

const phonebook = new Person({
    name: process.argv[3],
    number: process.argv[4],
})


if (process.argv.length === 3) {
    console.log('give password as argument', process.argv)

    Person.find({}).then(result => {
        result.forEach(persons => {
            console.log(persons)
        })
        mongoose.connection.close()
    })
} else {
    phonebook.save().then(result => {
        console.log('phonebook saved!')
        mongoose.connection.close()
    })
} 