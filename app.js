require('@google-cloud/trace-agent').start();
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');

const { getHomePage } = require('./routes/index');

const app = express();
const port = 3000;

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});

// routes for the app
app.get('/', getHomePage);

// Route Files
let todos = require('./routes/todo');
app.use('/todos', todos);
axios.get('https://todo-app-be-47nak22qfa-as.a.run.app/api/todos')
  .then(response => {
    // Xử lý dữ liệu từ phản hồi
    console.log(response.data);
  })
  .catch(error => {
    // Xử lý lỗi
    console.error(error);
  });
