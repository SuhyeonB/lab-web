require('dotenv').config();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../schemas/user');

const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
});

const generateRandom = () => {
    let random = Math.floor(Math.random() * 9000) + 1000;
    return random.toString();
}

const verificationCodes = new Map();

const sendVerificationCode = async (userEmail) => {
    const code = generateRandom();
    verificationCodes.set(userEmail, { code, expires: Date.now() + 300000 }); // 5분 후 만료

    const mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: userEmail,
        subject: 'DB LAB 인증번호',
        html: `<p>회원가입 인증번호는 <strong>${code}</strong>입니다.</p>`,
    };

    try {
        await smtpTransport.sendMail(mailOptions);
        return code;
    } catch (err) {
        throw new Error('Error sending email');
    }
};

const generatePassword = () => {
    const length = Math.floor(Math.random() * (10 - 8 + 1) + 8); // 8에서 10 사이의 길이
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = '';

    // 비밀번호 길이 만큼 랜덤 문자 선택
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
};

const sendNewPasswordEmail = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("해당 이메일을 가진 사용자가 없습니다.");
    }

    const newPassword = generatePassword();

    user.password = newPassword;
    await user.save();

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'NEW PASSWORD',
        text: `Your new password is: ${newPassword}`
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
};

module.exports = { sendVerificationCode, sendNewPasswordEmail };