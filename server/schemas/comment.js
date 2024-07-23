const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const commentSchema = new Schema({
    writer: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true,
    },
    postId: {
        type: ObjectId,
        required: true,
        ref: 'Post',
    },
    parentComment: {
        type: ObjectId,
        ref: 'Comment',
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Comment', commentSchema);
