const router = require('express').Router();
const sequelize = require('../config/connections');
const { Post, User, Comment} = require('../models');

router.get('/', async(req,res)=>{
    const postData = await Post.findAll().catch((err)=>{
        res.json(err);
    });
const post = postData.map((post)=>post.get({plain:true}));
res.render('homepage',{post,loggedIn: req.session.loggedIn});
});

router.get('login', (req, res)=>{
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;