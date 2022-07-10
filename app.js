const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const todos = require('./server/routes/todos')
const connectDB = require('./database/db')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./public'))
app.use(express.json())

app.use('/todos', todos)

app.use(notFound)
app.use(errorHandler)

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
