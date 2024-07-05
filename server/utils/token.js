require('dotenv').config();
const Token = require('../schemas/token');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_SECRET;

// const verifyToken : token 유효성 검사 
// verify method : 검증. 발급받은 터큰이 제대로 만들어진 토큰인지 확인 : jwt.verify(token, secret)

const makeAccessToken = (user) => {   // 회원정보(user)를 인자로 토큰 생성
    const access_token = jwt.sign(
        user,
        JWT_KEY,
        { expiresIn: "1h" }
    );
    return access_token;
}

const makeRefreshToken = () => {
    const refresh_token = jwt.sign(
        {},
        JWT_KEY,
        {
            algorithm: "HS256",
            expiresIn: "12h"
        }
    );
    return refresh_token;
};

// refresh token 유효성 검사
const verifyRefresh = async (token, userId) => {
    try {
        const result = await Token.findOne({ email: userId });
        if (token === result.refreshToken) { // db에 있는 refresh와 동일
            try {
                jwt.verify(token, JWT_KEY);
                return true;
            } catch {
                return false;
            }
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

// access token 유효성 검사
const verifyAccess = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_KEY);
        console.log(decoded);
        console.log(decoded.id);
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