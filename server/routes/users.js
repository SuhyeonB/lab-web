const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const Token = require('../schemas/token');
const bcrypt = require('bcrypt');
//const auth = require('../middleware/auth');
const { makeAccessToken, makeRefreshToken, verifyRefresh, verifyAccess } = require('../utils/token');
const auth = require('../middleware/auth.js')

// 회원 가입
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
         // 중복 확인
         const existingName = await User.findOne({ name });
         if (existingName) {
            console.log('existing name');
             return res.status(409).json({ message: "이미 사용 중인 이름입니다." });
         }
         const existingEmail = await User.findOne({ email });
         if (existingEmail) {
            console.log('existing name');
             return res.status(409).json({ message: "이미 사용 중인 이메일입니다." });
         }

        const user = new User({
            name: name,
            email: email,
            password: password,
        });

        await user.save();
        res.status(201).json({
            message: "회원 가입에 성공하였습니다.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
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
        const access_token = makeAccessToken(user);
        const refresh_token = makeRefreshToken(user);

        await Token.updateOne(
            {email},
            { email, refresh_token },
            { upsert: true }
        );

        res.status(200).json({ access_token, refresh_token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "ServerError "});
    }
})

// Access Token 재발급
router.post('/refresh-token', async (req, res) => {
    const { refresh_token } = req.body;
    try {
        const decoded = jwt.verify(refresh_token, JWT_KEY);
        if (!decoded) {
            return res.status(401).json({ success: false, msg: "Invalid refresh token" });
        }

        const email = decoded.email;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, msg: "User not found" });
        }

        const isValid = await verifyRefresh(refresh_token, email);
        if (!isValid) {
            return res.status(401).json({ success: false, msg: "Invalid refresh token" });
        }
        
        const access_token = makeAccessToken(user);

        res.status(200).json({ access_token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Server error" });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const email = req.user.email;
        const user = await User.findOne({ email });
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;