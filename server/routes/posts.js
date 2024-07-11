const express = require('express');
const Post = require('../schemas/post');
const authenticateToken = require('../middleware/auth');

var router = express.Router();

// get
router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.find({});
        res.json(posts);
    } catch(err) {
        console.error(err);
        next(err);
    }
})
router.get('/:id', async (req, res, next) => {
    try {
        const post = await Post.findOne({ _id: req.params.id })
        res.json(post);
    } catch (err) {
        console.error(err);
        next(err)
    }
})

//post
router.post('/', async (req, res, next) => {
    try {
        const post = new Post({
            writer: req.body.writer,
            category: req.body.category,
            title: req.body.title,
            content: req.body.content,
        });
        post.save()
            .then((result)=> {
                res.status(201).json(result);
            })
            .catch((err)=>{
                console.error(err);
            })
    } catch(err) {
        console.error(err);
        next(err)
    }
})

// update
// patch : 수정 필요(createdAt (수정날짜))
router.patch('/:id', authenticateToken, async (req, res, next) => {
    try {
        Post.updateOne({ _id: req.params.id }, {
               category: req.body.category,
               title: req.body.title, 
               content: req.body.content 
           })
           .then((result)=> {
               res.status(201).json(result);
           })
           .catch((err)=>{
               console.error(err);
           })
    } catch(err) {
        console.error(err);
        next(err);
    }
})

// delete
router.delete('/:id', authenticateToken, async (req, res, next) => {
    try {
        Post.deleteOne({ _id: req.params.id })
        .then((result)=>{
            res.json(result);
        })
        .catch((err)=>{
            console.error(err);
            next(err);
        });
    } catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;