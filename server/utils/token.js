require('dotenv').config();
const Token = require('../schemas/token');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_SECRET;

const makeAccessToken = (user) => {
    return jwt.sign(
        { id: user._id },
        JWT_KEY,
        { expiresIn: "1h" }
    );
}

const makeRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id },
        JWT_KEY,
        { algorithm: "HS256", expiresIn: "12h" }
    );
};

// refresh token 유효성 검사
const verifyRefresh = async (token, userId) => {
    try {
        const result = await Token.findOne({ email: userId });
        if (!result || token !== result.refreshToken) return false;
        jwt.verify(token, JWT_KEY);
        return true;
    } catch (err) {
        return false;
    }
};

// access token 유효성 검사
const verifyAccess = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_KEY);
        return {
            ok: true,
            id: decoded.id
        };
    } catch (error) {
        return {
            ok: false,
            message: error.message,
        };
    }
}

module.exports = { makeAccessToken, makeRefreshToken, verifyRefresh, verifyAccess };