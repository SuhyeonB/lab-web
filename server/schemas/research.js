const mongoose = require('mongoose');

const { Schema } = mongoose;

const researchSchema = new Schema({
    period: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Research', researchSchema);