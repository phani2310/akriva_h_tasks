const mysql = require('mysql2/promise');

// Async function to create and return the connection
const db = async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Phani@23',  // Replace with your actual DB password
            database: 'akrivia', // Replace with your actual DB name
        });
        console.log('Database connected successfully!');
        return connection;
    } catch (err) {
        console.error('Database connection failed:', err);
        throw err;
    }
};

module.exports = { db };