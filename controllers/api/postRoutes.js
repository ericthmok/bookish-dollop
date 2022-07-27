const router = require('express').Router();
const {User, Post, Comment} = require('../../models');

router.post('/', async (req,res)=>{
    try{
        const newPostData = await Post.create({
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

router.put('/:id', async(req, res)=>{
    try{
        const editPostData = await Post.update({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.userId,
        })
        res.status(200).json("Updated")
    } catch (err){
        console.log(err);
        res.status(400).json(err);
    }
});

router.delete('/:id', async(req,res)=>{
    try{
        const deletePost = await Post.destroy({where:{id: req.params.id}})
        res.status(200).json(deletePost)
    } catch(err){
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports=router;