const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.ACCESS_TOKEN_SECRET;

const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).send({ error: 'Access denied' });
    }
    try {
        const decoded = jwt.verify(token, JWT_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send({ error: 'Invalid token' });
    }
};

module.exports = auth;