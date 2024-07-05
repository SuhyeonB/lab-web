const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const Token = require('../schemas/token');
const bcrypt = require('bcrypt');
//const auth = require('../middleware/auth');
const { makeAccessToken, makeRefreshToken, refreshVerify, veriAccess } = require('../utils/token');

// 회원 가입
router.post('/signup', async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        user.save()
            .then((result)=> {
                res.status(201).json(result);
            })
            .catch((err)=>{
                console.error(err);
            })
    } catch(err) {
        console.error(err);
        next(err)
    }
});

// 로그인

router.post('/signin', async(req, res) => {
    const { email, password } = req.body;
    try {
        // 로그인 이메일 확인
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ error: "잘못된 이메일이나 패스워드입니다"})
        }
        // 로그인 패스워드 확인
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: "잘못된 이메일이나 패스워드입니다"})
        }
        const access_token = makeAccessToken({ email: user.email });
        const refresh_token = makeRefreshToken();

        await Token.updateOne(
            {email},
            { email, refresh_token },
            { upsert: true }
        );

        res.status(200).json({ access_token, refresh_token, email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "ServerError "});
    }
})

// Access Token 재발급
router.post('/refresh-token', async (req, res) => {
    const { email, refresh_token } = req.body;
    try {
        const isValid = await refreshVerify(refresh_token, email);
        if (!isValid) {
            return res.status(401).json({ success: false, msg: "Invalid refresh token" });
        }

        // 새 Access Token 생성
        const access_token = makeAccessToken({ email });

        res.status(200).json({ access_token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "ServerError" });
    }
});

module.exports = router;