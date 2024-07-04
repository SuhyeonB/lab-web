const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Token', tokenSchema);
