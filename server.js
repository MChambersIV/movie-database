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


app.get('/api/movies', (req, res) => {
  console.info(`${req.method} request received`);

  db.query('SELECT * FROM movies', function (err, results) {
    return res.json(results);
  });
});

app.get('/api/add-movie', (req, res) => {
  console.info(`get request received add movies`)
});


app.post('/api/add-movie', (req, res) => {
  console.info(`${req.method} request received to add movie`);

  const { title, review } = req.body;

  if (title && review) {
    const newMovie = {
      title,
      review
    };

    const response = {
      status: 'success',
      body: newMovie,
    };

    console.log(response);
    res.json(response);
  } else {
    res.json('Error in posting review');
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});