const express = require('express');
const mysql = require('mysql2');
// const table = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Connect to database
// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: 'password',
//         database: 'company_db'
//     },
//     console.log('Connect to company_db')
// );

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});