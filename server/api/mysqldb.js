const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 50,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'musicplayer',
  multipleStatements: true
})

const operate = (sql, ...param) => {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (error, connection) {
      if (error) {
        return reject(error)
      }
      connection.query(sql, param, function (error, response, fields) {
        connection.release()
        if (error) {
          return reject(error)
        }
        resolve(response)
      })
    })
  })
}

const insert = function (table, param) {
  return operate(`INSERT INTO ${table} SET ?`, param)
}

const selectOne = function (table, param) {
  return operate(`SELECT * FROM ${table} WHERE ? LIMIT 1`, param)
}

const selectAll = function (table, param) {
  if (param === undefined) {
    return operate(`SELECT * FROM ${table}`)
  } else {
    return operate(`SELECT * FROM ${table} WHERE ?`, param)
  }
}

module.exports = {
  insert,
  selectOne,
  selectAll
}
