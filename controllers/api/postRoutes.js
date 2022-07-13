const router = require('express').Router();
const {User, Post, Comment} = require('../../models');
const withAuth = require ('../../utils/auth');
const sequelize = require('../../config/connections');

router.get('/', (req, res)=>{
    Post.findAdll({
        attributes: ['id','title','post_text'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                include:{
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbPostData=> res.json(db(dbPostData)))
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req,res)=>{
    Post.findOne({
        where:{
            id:req.params.id
        },
        attributes: ['id', 'title', 'post_text'],
        include: {
            model: User,
            atttibutes: ['username']
        }
    })
}) .then(dbPostData=>{
    if(!dbPostData){
        res.status(404).json({message: 'Id not found'});
        return;
    }
}) .catch(err=>{
    console.log(err);
    res.status(500).json(err);
});

router.post('/', withAuth, (req, res)=>{
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    })
    .then(dbPostData=>res.json(dbPostData))
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res)=>{
    Post.update(
        {
            title: req.body.title,
            post_text: req.body.post_text
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData=>{
        if(!dbPostData){
            res.status(404).json({message: 'Id not found'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res)=>{
    Post.destroy({
        where: {
            id: req.params.id
        }
    }) .then(dbPostData=>{
        if (!dbPostData){
            res.status(404).json({message:'Id not foung'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports=router;