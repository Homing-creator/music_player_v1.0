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

const insertMuti = function (table, param) {
  const columnList = Object.keys(param.list[0])
  const valueList = []
  param.list.forEach(item => { valueList.push(Object.values(item)) })
  return operate(`INSERT INTO ${table} (${columnList.toString()}) VALUES ?`, valueList)
}

const selectOne = function (table, param) {
  return operate(`SELECT * FROM ${table} WHERE ? LIMIT 1`, param)
}

const selectUserId = function (table, id) {
  return operate(`SELECT userId FROM ${table} WHERE userId<>?`,id)
}

const selectSongId = function (table, param) {
  return operate(`SELECT songId, songName, singer, songCover FROM ${table} WHERE ?`, param)
}

const selectAll = function (table, param) {
  if (param === undefined) {
    return operate(`SELECT * FROM ${table}`)
  } else {
    return operate(`SELECT * FROM ${table} WHERE ?`, param)
  }
}

const deleteOne = function (table, param) {
  const arr = []
  for (const i in param) {
    arr.push(`${i}='${param[i]}'`)
  }
  return operate(`DELETE FROM ${table} WHERE ${arr.join(' AND ')} LIMIT 1`, param)
}

const deleteMuti = function (table, param) {
  return operate(`DELETE FROM ${table} WHERE ${param.key} IN ('${param.list.join(`','`)}')`)
}

module.exports = {
  insert,
  insertMuti,
  selectOne,
  selectUserId,
  selectSongId,
  selectAll,
  deleteOne,
  deleteMuti
}

/*
pool.getConnection(function (err, con) {
    const query = con.query(`DELETE FROM ${table} WHERE ${arr.join(' AND ')} LIMIT 1`, param, function (err) {
      if (err) throw err
    })
    console.log(query.sql)
  })
 */
/*
批量插入数据
var mysql = require('node-mysql');
var conn = mysql.createConnection({
    ...
});

var sql = "INSERT INTO Test (name, email, n) VALUES ?";
var values = [
    ['demian', 'demian@gmail.com', 1],
    ['john', 'john@gmail.com', 2],
    ['mark', 'mark@gmail.com', 3],
    ['pete', 'pete@gmail.com', 4]
];
conn.query(sql, [values], function(err) {
    if (err) throw err;
    conn.end();
});
*/
