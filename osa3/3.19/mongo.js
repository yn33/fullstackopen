const mongoose = require('mongoose')
const unique = require('mongoose-unique-validator')
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
  name:  { type: String, required: true, unique: true },
  number: { type: String, required: true }
})

phoneNumberSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})  
phoneNumberSchema.plugin(unique)

module.exports = mongoose.model('PhoneNumber', phoneNumberSchema)

