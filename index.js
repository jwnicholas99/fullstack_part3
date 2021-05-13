require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require('./models/mongo.js')

morgan.token('object', (req, res) => {
    if (req.method == "POST"){
        return JSON.stringify(req.body)
    }

    return ""
})

const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.object(req, res)
      ].join(' ')
}))

app.get('/', (request, response) => {
    response.send("<h1>Phonebook Server</h1>")
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => response.json(persons))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person){
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number){
        return response.status(400).json({
            error: 'name or number field empty'
        })
    }

    const person = Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => response.json(savedPerson))
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number){
        return response.status(400).json({
            error: 'name or number field empty'
        })
    }
    
    const update = {
        number: body.number
    }
    
    Person.findByIdAndUpdate(request.params.id, update, {new: true})
        .then(updatedPerson => response.json(updatedPerson))
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.get('/info', (request, response) => {
    const date = new Date()
    
    response.send(`
    <div>
        <p>Phone has info for ${persons.length}</p>
        <p>${date.toUTCString()} ${date.getTimezoneOffset()}</p>
    </div>`)
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError'){
        return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})