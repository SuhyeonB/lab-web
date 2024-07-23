const { verifyAccess } = require('../utils/token');

const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).send({ error: 'Access denied' });
    }

    const token = authHeader.split(' ')[1];  // Bearer 토큰 분리
    if (!token) {
        return res.status(401).send({ error: 'No token provided' });
    }

    const { ok, email, message } = verifyAccess(token);
    if (!ok) {
        console.log("access token is " + message);
        if (message === 'jwt expired') {
            return res.status(401).send({ error: 'Access token is expired' });
        }
        return res.status(401).send({ error: 'Invalid token' });
    }

    req.user = { email };

    next();
};

module.exports = auth;
