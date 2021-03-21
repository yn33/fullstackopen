const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

app.use(express.static('build'))
app.use(cors())
app.use(express.json()) 
morgan.token('post', function (req, res) { return JSON.stringify(req.body) }, 'POST')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))

const PhoneNumber = require('./mongo')
const PORT = process.env.PORT
  
  app.get('/api/persons', (req, res) => {
    PhoneNumber.find({}).then(persons => {
      res.json(persons)
    })
  })

  app.get('/api/persons/:id', (req, response) => {
    PhoneNumber.findById(req.params.id).then(person => {
      res.json(person)
    })
  })
  
  app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({ 
        error: 'name missing' 
        })
    }

    if (!body.number) {
      return res.status(400).json({ 
      error: 'number missing' 
      })
    }


    const person = new PhoneNumber({
        name: body.name,
        number: body.number
    })
    

    person.save().then(savedPerson => {
      res.json(savedPerson)
    })

  })

  app.delete('/api/persons/:id', (req, res) => {
    Note.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
  })
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

  const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)
  