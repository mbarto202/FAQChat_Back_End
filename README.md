# FAQChat Back-End

Back-end server for FAQChat application. Built with Node.js and Express.

## Steps to Set Up PostgreSQL in a Docker Container

### Step 1: Install Docker
You can find the installation here https://docs.docker.com/engine/install/.

### Step 2: Pull PostgreSQL image from Docker Hub
```bash
docker pull postgres
```

### Step 3: Run PostgreSQL Container
```bash
docker run --name faqchat-db -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```

### Step 4: Run PostgreSQL Container
```bash
docker exec -it faqchat-db psql -U postgres
```

- faqchat-db is the name of the container.
- POSTGRES_PASSWORD sets the password for the default postgres user.
- -p 5432:5432 exposes the PostgreSQL database on port 5432.

### Step 5: Create the Database
Once inside the shell, create the database.

```sql
CREATE DATABASE faqchat_db
```

### Step 6: Create Table
Connect to database:

```bash
\c faqchat_db
```

Create the user table:
```sql
CREATE TABLE "user" (
  user_id SERIAL PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  long_string_faq_data TEXT NOT NULL
);
```

- user_id: Auto-increments with SERIAL and is set as the primary key.
- user_email: A string field that is non-nullable and must be unique.
- long_string_faq_data: A TEXT field designed to handle long strings.

### Step 7: Verify Table Creation
```sql
\d user
```

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