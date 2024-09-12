import express from 'express';
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config(); // Load environment variables

const app = express();
const port = 3000;

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

// Route to db connection
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

export default app;