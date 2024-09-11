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