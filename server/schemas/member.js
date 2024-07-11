const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    year: { // 학번
        type: String,
        required: true,
        unique: true
    },
    state: { type: String },
    image: { type: String },
});

module.exports = mongoose.model('Member', memberSchema);