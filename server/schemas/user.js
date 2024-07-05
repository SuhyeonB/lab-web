const mongoose = require('mongoose');
const Schema = mongoose.Schema;
<<<<<<< HEAD
const bcrypt = require('bcrypt');
=======
>>>>>>> 7985335e697b69230d6f4ea8acfb00a3ff5802f6

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    image: {
        type: String,
        default: 'server/images/user_default.jpg',
    },
    manager: {
        type: Boolean,
        default: false,
    },
});

<<<<<<< HEAD
// 비밀번호 암호화
userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})

=======
>>>>>>> 7985335e697b69230d6f4ea8acfb00a3ff5802f6
module.exports = mongoose.model('User', userSchema);
