# FAQChat Back-End

Back-end server for FAQChat application. Built with Node.js and Express.

## Steps to Connect to PostgreSQL Using Docker

### Step 1: Pull PostgreSQL Docker Image
```bash 
docker pull postgres
```

### Step 2: Run PostgreSQL Container
```bash 
docker run --name faqchat-db -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```

### Step 3: Connect to PostgreSQL in server.js
```javascript 
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'faqchat_db',
    password: 'mysecretpassword',
    port: 5432,
});
```

### Access the Database in the Command Line
```bash
docker exec -it faqchat-db psql -U postgres -d faqchat_db
```

## Usage

### Start Server
```bash
npm start
```

### Endpoints

- GET /: Returns a welcome message.

- GET /users: Retrieves a list of all users from the "user" table.

- GET /user/:id: Retrieves information for a specific user by user_id. Replace :id with the actual user ID.

- GET /test-db-connection: Tests the database connection and returns the current server time from the database.

### Error Handling

- If the database connection fails, an error message will be logged to the console and returned to the client.

- If a requested user does not exist, a 404 status code will be returned.

- Invalid user ID inputs will return a 400 status code.