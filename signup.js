const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.urlencoded({ extended: true }));

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'varsha03*',
  database: 'login'
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database.');
});

// Define a route handler for the GET request to /signup
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

// Define a route handler for the POST request to /signup
app.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Insert the new user into the database
  const sql = 'INSERT INTO login (username, password) VALUES (?, ?)';
  connection.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Error adding user to database:', err);
      res.send('Error adding user to database.');
      return;
    }
    console.log('User added to database:', result);
    res.send('User added to database.');
  });
});

// Start the server on port 2007
app.listen(2007, () => {
  console.log('Server started on port 2007');
});
