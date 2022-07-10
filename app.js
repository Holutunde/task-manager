const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const todos = require('./server/routes/todos')
const connectDB = require('./database/db')
const notFound = require('./middleware/notFound')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./public'))
app.use(express.json())
app.use(notFound)

app.use('/todos', todos)

const port = process.env.PORT || 4000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`Server is listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
