const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dbUsers = require('../services/queriesUser')
const dbData = require('../services/queriesDatos')
const port = 3000
const router = express.Router();

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

app.get('/data', dbData.getData)
app.get('/data/:id', dbData.getDataById)
app.post('/data', dbData.createData)
app.put('/data/:id', dbData.updateData)
app.delete('/data/:id', dbData.deleteData)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

module.exports = router ;