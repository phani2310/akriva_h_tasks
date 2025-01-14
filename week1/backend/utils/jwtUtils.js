const jwt = require('jsonwebtoken');

const JWT_SECRET = '10';
const generateToken = (user) => {
    const payload = { name: user.name };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };