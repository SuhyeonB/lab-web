const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const Token = require('../schemas/token');
const multer = require('multer');
const path = require('path');
const { check } = require('express-validator');
const bcrypt = require('bcrypt');
const { sendVerificationCode,sendNewPasswordEmail } = require('../utils/mail');

const { makeAccessToken, makeRefreshToken, verifyRefresh } = require('../utils/token');
const auth = require('../middleware/auth.js')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/images'); // 이미지 저장 디렉터리 지정
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`); // 파일명 변경
    }
});

const upload = multer({ storage: storage });

// 프로필 이미지 업데이트 라우트
router.post('/update-image', upload.single('image'), async (req, res) => {
    try {
        const email = req.user.email;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 이미지 파일 경로 업데이트
        user.image = `/images/${req.file.filename}`;
        await user.save();

        res.status(200).json({ message: 'Image updated successfully', imagePath: user.image });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating image' });
    }
});

// 회원 가입
router.post('/email', async (req, res, next) => {
    try {
        let userEmail = req.body.email;
        const code = await mailing(userEmail);
        res.status(200).json({code: code});
    } catch (err) {
        console.error(err);
        next(err);
    }
})

router.post('/signup', [
  check('password').isLength({ min: 8, max: 16 }).withMessage('Password must be between 8-16 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, "i")
    .withMessage('Password must include upper, lower, number, and special character'),
], async (req, res) => {
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
        const { ok, email } = await verifyRefresh(refresh_token);
        console.log(ok);
        const user = await User.findOne({ email: email });
        if (!ok) {
            return res.status(401).json({message: "refresh expired"});
            /* 자동로그인
            const newRefreshToken = makeRefreshToken(user);
            await Token.updateOne(
                { email: email },
                { email: email, refreshToken: newRefreshToken },
                { upsert: true }
            );

            const newAccessToken = makeAccessToken(user);
            return res.status(200).json({ access_token: newAccessToken, refresh_token: newRefreshToken });*/
        }
        const newAccessToken = makeAccessToken(user);
        res.json({ access_token: newAccessToken });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid or expired refresh token" });
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

router.post('/update-profile', upload.single('image'), async (req, res) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        user.name = req.body.name || user.name;
        if (req.body.password) {
            user.password = await bcrypt.hash(req.body.password, 10);
        }

        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating profile' });
    }
});

router.post('/send-email', async (req, res) => {
    try {
        let userEmail = req.body.email;
        const code = await sendVerificationCode(userEmail);
        res.status(200).json({code: code});
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ message: 'Error sending verification email' });
    }
});

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        await sendNewPasswordEmail(email);
        res.status(200).send({ message: 'New password sent to your email.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ message: 'Failed to send email.' });
    }
});

router.delete('/delete-account', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.remove();
        res.status(200).json({ message: 'Account has been deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting account' });
    }
});

module.exports = router;