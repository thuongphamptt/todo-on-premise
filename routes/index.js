const { connection } = require('../config/database');

const getHomePage = (req, res) => {
  let sql = `SELECT * FROM todos`;

  connection.query(sql, (err, result) => {
    if (err) {
      res.redirect('/');

      throw err;
    }

    result.forEach(function(todo) {
      if (todo.is_completed == 1) {
        todo.is_completed = true;
      } else {
        todo.is_completed = false;
      }
    });

    res.render('home', {
      todos: result
    });
  });
};

module.exports = {
  getHomePage
};
