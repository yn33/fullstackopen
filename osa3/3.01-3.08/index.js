const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json()) 
morgan.token('post', function (req, res) { return JSON.stringify(req.body) }, 'POST')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))


let persons = [

  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
  }
]

  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/info', (req, res) => {
      const date = new Date()
      const output = "Phonebook has info for 4 people<br/><br/>".concat(date.toString())
      res.send(output)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })
  
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })
  
  const generateId = () => {
    const random = Math.random()
    return Math.floor(random*10000)
  }

  app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({ 
        error: 'name missing' 
        })
    }

    if (persons.map(person => person.name).includes(body.name)) {
      return response.status(400).json({ 
        error: 'name must be unique' 
        })
    }

    if (!body.number) {
      return response.status(400).json({ 
      error: 'number missing' 
      })
    }


    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    

    persons = persons.concat(person)

    response.json(person)
  })

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)
  