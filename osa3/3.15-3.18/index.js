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
  
  app.get('/api/persons', (req, res, next) => {
    PhoneNumber.find({}).then(persons => {
      res.json(persons)
    })
    .catch(error => next(error))
  })

  app.get('/api/persons/:id', (req, res, next) => {
    PhoneNumber.findById(req.params.id).then(person => {
      if(person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
  })
  
  app.get('/info', (req, res) => {
    PhoneNumber.find({}).then(persons => {
      const date = new Date()
      const output = `Phonebook has info for ${persons.length} people<br/><br/>`.concat(date.toString())
      res.send(output)
    })
    .catch(error => next(error))
  })

  app.post('/api/persons', (req, res, next) => {
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
    .catch(error => next(error))

  })

  app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
  
    const person = {
      name: body.name,
      number: body.number,
    }
  
    PhoneNumber.findByIdAndUpdate(req.params.id, person, { new: true })
      .then(updatedPerson => {
        res.json(updatedPerson)
      })
      .catch(error => next(error))
  })

  app.delete('/api/persons/:id', (req, res, next) => {
    PhoneNumber.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
  })

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

  const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)
  