const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(result => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

const phoneNumberSchema = new mongoose.Schema({
  name: String,
  number: String
})

module.exports = mongoose.model('PhoneNumber', phoneNumberSchema)

