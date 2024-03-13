const express = require('express')
const app = express()
const morgan = require('morgan');
const cors = require('cors')

app.use(express.json())
app.use(cors())

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


function getRandomInt() {
    const minCeiled = Math.ceil(5);
    const maxFloored = Math.floor(1000);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}


const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)

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

app.post('/api/persons', (request, response) => {

    const body = request.body;
    const duplicateName = persons.find(person => person.name === body.name)
    if (!body.number || !body.name) {
        return response.status(400).json({ error: 'name or number is missing' })
    }

    if (duplicateName) {
        return response.status(400).json({ error: 'name must be unique' })
    }

    const id = getRandomInt()
    const newPhonebook = {
        name: body.cotent,
        number: body.number,
        id: id
    }
    newPhonebook.id = id;
    persons.concat(newPhonebook);
    response.status(200).json(newPhonebook)

})

app.delete('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id);
    const person = persons.filter(person => id !== person.id);
    response.status(204).end()

})

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.end(JSON.stringify(persons))
})

app.get('/api/info', (request, respoense) => {

    const currentDataTime = new Date();
    respoense.send(`<p>Phonebook has info for ${persons.length} people</p> ${currentDataTime}`)
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})