const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'movie_db'
  },
  console.log(`Connected to the movie_db database.`)
);


// db.query('SELECT * FROM reviews');

app.get('/api/movies', (req, res) => {
  console.info(`${req.method} request received`);

  db.query('SELECT * FROM movies', function (err, results) {
    return res.json(results);
  });


});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});