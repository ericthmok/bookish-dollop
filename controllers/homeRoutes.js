const router = require('express').Router();
const sequelize = require('../config/connections');
const { Post, User, Comment} = require('../models');

router.get('/', (req, res)=>{
    Post.findAll({
        attributes: ['id', 'title', 'post_text'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
})
.then(dbPostData =>{
    const post = dbPostData.map(post => post.get({ plain: true}));
    res.render('home',{
        post, logginIn: req.session.loggedIn
    });
})
.catch(err =>{
    console.log(err);
    res.status(500).json(err);
})

router.get('login', (req, res)=>{
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/post/id', (req, res)=>{
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'post_text'],
        include: [
            {
                model: Comment,
                attributes: ['id','comment_text','post_id','user_id'],
                include:{
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
})
.then(dbPostData=>{
    if(!dbPostData){
        res.status(404).json({message:'No Id found'});
        return;
    }
    const post = dbPostData.get({ plain: true});
    res.render('single-post',{
        post,
        loggedIn: req.session.loggedIn
    });
})
.catch(err=>{
    console.log(err);
    res.status(500).json(err);
});

module.exports = router;