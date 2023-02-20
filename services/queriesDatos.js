const db = require('./db');

// se muestran todos los datos
const getData = (request, response) => {
  db.query('SELECT * FROM Datos ORDER BY IDdata ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// se muestra el usuario buscado por ID
const getDataById = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('SELECT * FROM Datos WHERE IDdata = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// se inserta un nuevo Data
const createData = (request, response) => {
  const { name, email, phone, IDuser } = request.body

  db.query('INSERT INTO Datos (name, email, phone, IDuser) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, phone, IDuser], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Datos added with ID: ${results.rows[0].id}`)
  })
}

//se actualiza el data
const updateData = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email, phone } = request.body

  db.query(
    'UPDATE Datos SET name = $1, email = $2, phone = $3 WHERE IDdata = $4',
    [name, email, phone, IDdata],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Datos modified with ID: ${id}`)
    }
  )
}

// se elimina el Data por medio de ID
const deleteData = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('DELETE FROM Datos WHERE IDdata = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Datos deleted with ID: ${id}`)
  })
}

module.exports = {
  getData,
  getDataById,
  createData,
  updateData,
  deleteData,
}