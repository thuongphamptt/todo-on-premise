// This file is to connect to mysql database

require('dotenv').config();
const mysql = require('mysql');

const keys = require('./keys');

const connection = mysql.createConnection(keys.mysql);

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  let createTodos = `create table if not exists todos(
                          todo_title varchar(255)not null,
                          todo_body varchar(255)not null,
                          is_completed tinyint(1) not null default 0
                      )`;

  connection.query(createTodos, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  connection.end(function(err) {
    if (err) {
      return console.log(err.message);
    }
  });
  console.log('connected!');
});

module.exports = {
  connection
};
