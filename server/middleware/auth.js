const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_SECRET;

const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).send({ error: 'Access denied' });
    }
    const token = authHeader.split(' ')[1];  // Bearer 토큰 분리
    if (!token) {
        return res.status(401).send({ error: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, JWT_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Invalid token' });
    }
};

module.exports = auth;