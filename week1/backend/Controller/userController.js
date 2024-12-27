const { db } = require('../Database/Dbconnect.js');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwtUtils');


const registerUser = async (req, res) => {
    const { name, pass } = req.body;

    if (!name || !pass) {
        return res.status(400).send('Name and password are required.');
    }

    try {
        // Check if the user already exists
        const connection = await db();
        const checkUserSql = 'SELECT * FROM task1 WHERE name = ?';
        const [existingUser] = await connection.execute(checkUserSql, [name]);

        if (existingUser.length > 0) {
            // If a user with the same name exists, send an error response
            return res.status(400).send('User with this name already exists.');
        }

        // If the user doesn't exist, hash the password and create the new user
        const hashedPassword = await bcrypt.hash(pass, 10);
        const insertUserSql = 'INSERT INTO task1 (name, pass) VALUES (?, ?)';
        const [result] = await connection.execute(insertUserSql, [name, hashedPassword]);

        res.send('User registered successfully');
    } catch (err) {
        console.error('Error during registration:', err.message);
        res.status(500).send('Error registering user.');
    }
};



const loginUser = async (req, res) => {
    const { name, pass } = req.body;

    if (!name || !pass) {
        return res.status(400).send('Name and password are required.');
    }

    try {

        const connection = await db();
        const sql = 'SELECT * FROM task1 WHERE name = ?';
        const [rows] = await connection.execute(sql, [name]);

        if (rows.length === 0) {
            return res.status(401).send('User not found.');
        }

        const user = rows[0];

        const isValid = await bcrypt.compare(pass, user.pass);
        if (!isValid) {
            return res.status(401).send('Invalid password.');
        }

        const token = generateToken({ name: user.name });

        res.cookie('token', token, { httpOnly: true, secure: false });
        res.send('User logged in successfully');
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).send('Error logging in user.');
    }
};

module.exports = { registerUser, loginUser };