const mongoose = require('mongoose')
const length = process.argv.length

if (length != 3 && length != 5) {
  console.log('give password or password, name and number as argument')
  process.exit(1)
}

const password = process.argv[2]
const url =
  `mongodb+srv://fullstack:${password}@cluster0.ocif1.mongodb.net/test?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const phoneNumberSchema = new mongoose.Schema({
  name: String,
  number: String
})

const PhoneNumber = mongoose.model('PhoneNumber', phoneNumberSchema)

if(length == 5) {
    const name = process.argv[3]
    const number = process.argv[4]
    const phoneNumber = new PhoneNumber({
    name: name,
    number: number
    })  
    phoneNumber.save().then(response => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}

if(length == 3) {
    console.log("phonebook:\n")
    PhoneNumber.find({}).then(result => {
        result.forEach(entry => {
          console.log(`${entry.name} ${entry.number}\n`)
        })
        mongoose.connection.close()
      })
}

