const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dbUsers = require('../services/queriesUser')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', dbUsers.getUsers)
app.get('/users/:id', dbUsers.getUserById)
app.post('/users', dbUsers.createUser)
app.put('/users/:id', dbUsers.updateUser)
app.delete('/users/:id', dbUsers.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})