const router = require('express').Router();
const {User, Post, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res)=>{
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'title', 'post_text'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
})
.then(dbPostData=>{
    const posts = dbPostData.map(post.get({ plain: true}));
    res.render('dashboard', {posts, loggedIn: true});
})
.catch(err=>{
    console.log(err);
    res.status(500).json(err);
});

router.get('/edit/:id', withAuth, (req, res)=>{
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'post_text'],
        include: [
            {
            model: User,
            attributes: ['username']
            },
            {
            model: Comment,
            attributes: ['id', 'comment_text','post_id','user_id'],
            include: {
                model: User,
                attributes:['username']
            },
            }
        ]
    })
})
.then(dbPostData=>{
    if(!dbPostData){
        res.status(404).json({message: 'Id not found'});
        return;
    }
    const posts = dbPostData.get({ plain: true});
    res.render('edit-post',{
        post,
        loggerIn: true
    })
})
.catch(err=>{
    console.log(err);
    res.status(500).json(err);
});

module.exports = router;