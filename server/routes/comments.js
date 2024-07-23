const express = require('express');
const Comment = require('../schemas/comment');
const auth = require('../middleware/auth');

const router = express.Router();

// 댓글 생성
router.post('/', auth, async (req, res, next) => {
    try {
        const comment = new Comment({
            writer: req.user.email,
            comment: req.body.comment,
            postId: req.body.postId,
            parentComment: req.body.parentComment || null
        });
        await comment.save();
        res.status(201).json(comment);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 특정 게시글의 댓글 조회
router.get('/:postId', async (req, res, next) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId }).populate('parentComment');
        res.json(comments);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 댓글 수정
router.patch('/:id', auth, async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        if (comment.writer !== req.user.email) {
            return res.status(403).json({ message: 'You are not authorized to edit this comment' });
        }
        comment.comment = req.body.comment;
        await comment.save();
        res.json(comment);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 댓글 삭제
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        if (comment.writer !== req.user.email) {
            return res.status(403).json({ message: 'You are not authorized to delete this comment' });
        }
        await comment.remove();
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
