const router = require('express').Router();
const {Comment} = require('../../models');

router.get('/', async(req,res)=>{
    const commentData = await Comment.findAll().catch((err)=>{
        res.json(err);
    });
    const comments = commentData.map((post)=>post.get({plain: true}));
    res.render('homepage', {comments});
});

router.post('/', async(req,res)=>{
    try{
        const newCommentData = await Comment.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.userId,
        });
        res.status(200).json('Created')
    } catch(err){
        console.log(err);
        res.status(400).json(err);
    }
});

router.put('/:id', async(req,res)=>{
    try{
        const editCommentData = await Comment.update({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.userId,
        });
        res.status(200).json('Updated')
    } catch (err){
        console.log(err);
        res.status(400).json(err);
    }
});

router.delete('/:id', async(req,res)=>{
    try{
        const deleteComment = await Post.destroy({where:{id: req.params.id}})
        res.status(200).json(err);
    } catch (err){
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;

