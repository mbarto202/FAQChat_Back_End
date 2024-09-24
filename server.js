require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3001;

// connection setup/postgres info
const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
});

// Testing connection
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error acquiring client', err.stack);
    } else {
        client.query('SELECT NOW()',(err, result) => {
            release();
            if(err){
                console.error('error executing query', err.stack);
            } else {
                console.log('Connected to the database:', result.rows);
            }
        });
    }
});

// Route to home
app.get('/', (req, res) => {
  res.send('Welcome to FAQChat Backend!');
});

// Route to all users
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "user"');
        res.status(200).json(result.rows);  // Return all users as JSON
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Error retrieving users');
    }
});

// Route to display user information by ID
app.get('/user/:id', async (req, res) => {
    const userId = parseInt(req.params.id, 10);  // Convert user ID to integer
    if (isNaN(userId)) {
        return res.status(400).send('Invalid user ID');
    }
    
    try {
        const result = await pool.query('SELECT * FROM "user" WHERE user_id = $1', [userId]);
        if (result.rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Error retrieving user information');
    }
});

// Route to test db connection
app.get('/test-db-connection', (req, res) => {
    pool.query('SELECT NOW()', (err, result) => {
        if(err) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Error connecting to the database');
        } else {
            res.status(200).send(`Database connected! Current time: ${result.rows[0].now}`);
        }
    });
});

// Starting server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});