// This file is for connecting to the MySQL database
require('dotenv').config();
const mysql = require('mysql');
const keys = require('./keys');

const connection = mysql.createConnection(keys.mysql);

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting to the database: ' + err.message);
    return;
  }

  console.log('Connected to the database!');

  let createTodos = `CREATE TABLE IF NOT EXISTS todos (
    todo_title VARCHAR(255) NOT NULL,
    todo_body VARCHAR(255) NOT NULL,
    is_completed TINYINT(1) NOT NULL DEFAULT 0
  )`;

  connection.query(createTodos, function(err, results, fields) {
    if (err) {
      console.error('Error creating the todos table: ' + err.message);
      return;
    }

    console.log('Todos table created or already exists.');

    // connection.end(function(err) {
    //   if (err) {
    //     console.error('Error closing the database connection: ' + err.message);
    //     return;
    //   }
    //   console.log('Database connection closed.');
    // });
  });
});

module.exports = {
  connection
};
