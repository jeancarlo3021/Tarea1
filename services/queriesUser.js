
const db = require('./db');



// se seleccionan todos los usuarios
const getUsers = (request, response) => {
  db.query('SELECT * FROM Usuario ORDER BY IDuser ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// se muestra el usuario buscado por ID
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('SELECT * FROM Usuario WHERE IDuser = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// se inserta un nuevo usuario
const createUser = (request, response) => {
  const { username, password } = request.body
  db.query('INSERT INTO Usuario (username, password) VALUES ($1, $2) RETURNING *', [username, password], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Usuario added with ID: ${results.rows[0].id}`)
  })
}

//se actualiza el usuario
const updateUser = (request, response) => {
  const IDuser = parseInt(request.params.id)
  const { name, email, phone } = request.body

  db.query(
    'UPDATE Usuario SET name = $1, email = $2, phone = $3 WHERE IDuser = $4',
    [name, email, phone, IDuser],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Usuario modified with ID: ${id}`)
    }
  )
}

// se elimina el usuario por medio de ID
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('DELETE FROM Usuario WHERE IDuser = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Usuario deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}