require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Note = require('./models/note')
const Person = require('./models/person')

app.use(morgan(function (tokens, req, res) {
    return [
        JSON.stringify(req.body),
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}))

app.use(express.json())
app.use(express.static("dist"))

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"

    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!

app.get('/api/persons/:id', (request, response, next) => {

    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        }
        else {
            response.status(404).end()
        }
    }).catch(error => next(error))

    // related to some exercises in the same Part as well 
    /*  const person = persons.find(person => person.id === id)
     if (person) {
     }
     else {
         response.status(404).end()
     } */
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
        id: generateId(),
    })
    person.save().then(savePerson => {
        response.json(savePerson)
    })
})

app.delete('/api/persons/:id', (request, response) => {

    console.log('id', request.params.id)
    Person.findByIdAndDelete(request.params.id)
        .then(person => {
            if (person) {
                response.status(204).end()
            }
        }).catch(error => next(error));

    // persons = persons.filter(person => person.id !== id)
    // response.status(204).end()
})

app.delete('/api/notes/:id', (request, response, next) => {

    Note.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.post('/api/notes', (request, response) => {
    const body = request.body
    if (body.content === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }
    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})


app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important,
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        content: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatePerson => {
            response.json(updatePerson)
        })
        .catch(error => next(error))
})

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.use(errorHandler)
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})