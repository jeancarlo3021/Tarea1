const db = require('./db');

// se muestran todos los datos
const getData = (request, response) => {
  db.query('SELECT * FROM datos ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// se muestra el usuario buscado por ID
const getDataById = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('SELECT * FROM data WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// se inserta un nuevo Data
const createData = (request, response) => {
  const { name, email, phone, IDuser } = request.body

  db.query('INSERT INTO Data (name, email, phone, FK) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, phone, IDuser], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}

//se actualiza el data
const updateData = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  db.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

// se elimina el Data por medio de ID
const deleteData = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getData,
  getDataById,
  createData,
  updateData,
  deleteData,
}