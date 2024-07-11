const jwt = require('jsonwebtoken');
const { verifyAccess, makeAccessToken } = require('../utils/token');
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

    const { ok, email } = verifyAccess(token);
    if (!ok) {
        return res.status(401).send({ error: 'Invalid token' });
    }

    req.user = { email };

    // 토큰이 만료되었는지 확인하고, 만료된 경우 새로운 토큰 발급
    const decoded = jwt.decode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
        const newAccessToken = makeAccessToken(req.user);
        res.setHeader('Authorization', `Bearer ${newAccessToken}`);
    }

    next();
};

module.exports = auth;
