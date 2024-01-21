const express = require('express');
const mysql = require('mysql2');
// const mentorRoutes = require('./routes/mentor');
// const courseRoutes = require('./routes/course');

const app = express();
const port = 8080;

// MySQL Database Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass123',
    database: 'skillsharp1'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Use mentorRoutes middleware for specific path

// app.use('/', mentorRoutes);



app.get('/home', (req, res) => {
    res.send('he ji ji'); 
})


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = connection;
