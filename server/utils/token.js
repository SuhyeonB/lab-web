require('dotenv').config();
const Token = require('../schemas/token');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_SECRET;

const makeAccessToken = (user) => {
    return jwt.sign(
        { email: user.email },
        JWT_KEY,
        { expiresIn: "1h" }
    );
}

const makeRefreshToken = (user) => {
    return jwt.sign(
        { email: user.email },
        JWT_KEY,
        { algorithm: "HS256", expiresIn: "24h" }
    );
};

// refresh token 유효성 검사
const verifyRefresh = async (token) => {
    try {
        const decoded = jwt.verify(token, JWT_KEY);
        const result = await Token.findOne({ email: decoded.email });
        if (!result) return { ok: false };
        return { ok: true, email: decoded.email };
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return { ok: false, message: 'Token expired' };
        }
        return { ok: false, message: err.message };
    }
};

// access token 유효성 검사
const verifyAccess = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_KEY);
        return {
            ok: true,
            email: decoded.email
        };
    } catch (error) {
        return {
            ok: false,
            message: error.message,
        };
    }
}

module.exports = { makeAccessToken, makeRefreshToken, verifyRefresh, verifyAccess };