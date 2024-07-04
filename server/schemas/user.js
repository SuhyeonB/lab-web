const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = mongoose.model('User', userSchema);
