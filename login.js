const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'varsha03*',
  database: 'login'
});

db.connect((err) => {
  if (err) {
    console.log('Failed to connect to database');
    throw err;
  }
  console.log('Connected to database');
});
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sqlSelect = 'SELECT * FROM login WHERE username = ? AND password = ?';
  db.query(sqlSelect, [username, password], (err, result) => {
    if (err) {
      console.log('Failed to execute query');
      throw err;
    }
    if (result.length > 0) {
      res.redirect('http://127.0.0.1:5500/index.html'); // redirect to index.html on successful login
    } else {
      alert('Invalid username or password');
    }
  });
});
app.use(express.static('public'));
app.listen(2001, () => {
  console.log('Server started on port 2001');
});
