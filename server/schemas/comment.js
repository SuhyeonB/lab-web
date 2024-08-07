const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const commentSchema = new Schema({
    writer: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    comment: {
        type: String,
        required: true,
    },
    postNum: {
        type: ObjectId,
        required: true,
        ref: 'Post',
    },
    ref: {
        type: Number,
        required: true,
    },
    ord: {
        type: Number,
        required: true,
    },
    dep: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Comment', commentSchema);