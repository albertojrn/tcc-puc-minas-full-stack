const mysql = require('mysql')

const {
  REACT_APP_SQL_PORT,
  REACT_APP_SQL_HOST,
  REACT_APP_SQL_USER,
  REACT_APP_SQL_PASS,
  REACT_APP_SQL_DATABASE,
} = process.env

const db = mysql.createConnection({
  port: REACT_APP_SQL_PORT,
  host: REACT_APP_SQL_HOST,
  user: REACT_APP_SQL_USER,
  password: REACT_APP_SQL_PASS,
  database: REACT_APP_SQL_DATABASE,
  multipleStatements: true,
})

module.exports = db
