const express = require('express');
const {Pool} = require('pg');

const app = express();
const port = 3000;

// connection setup/postgres info
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'faqchat_db',
    password: 'mysecretpassword',
    port: 5432,
});

// Testing connection
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    client.query('SELECT NOW()',(err, result) => {
        release();
        if(err){
            return console.error('error executing query', err.stack);
        }
        console.log('Connected to the database:', result.rows);
    });
})

// Route to home
app.get('/', (req, res) => {
  res.send('Welcome to FAQChat Backend!');
});

// Route to db connection
app.get('/db', (req, res) => {
    pool.query('SELECT NOW()', (err, result) => {
        if(err) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Error connecting to the database');
        } else {
            res.send(`Databse connected! Current time: ${result.rows[0].now}`);
        }
    });
});

// Starting server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});