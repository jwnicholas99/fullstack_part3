const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

morgan.token('object', (req, res) => {
    if (req.method == "POST"){
        return JSON.stringify(req.body)
    }

    return ""
})

const app = express()
app.use(express.json())
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

let persons = [
    {name: "Dog", number: "104-151-1237", id: 1},
    {name: "Cat", number: "999-999-9999", id: 2}
]

app.get('/', (request, response) => {
    response.send("<h1>Phonebook Server</h1>")
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    response.json(persons.find(person => person.id === id))
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number){
        return response.status(400).json({
            error: 'name or number field empty'
        })
    }
    
    if (persons.find(person => person.name === body.name)){
        return response.status(400).json({
            error: 'name has already been added to the phonebook'
        })
    }

    const maxId = persons.length > 0
        ? Math.max(...persons.map(person => person.id))
        : 0
    
    const person = {...request.body, id: maxId + 1}
    persons = persons.concat(person)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    console.log(persons)
    response.status(204).end()
})

app.get('/info', (request, response) => {
    const date = new Date()
    
    response.send(`
    <div>
        <p>Phone has info for ${persons.length}</p>
        <p>${date.toUTCString()} ${date.getTimezoneOffset()}</p>
    </div>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})