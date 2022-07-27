const router = require('express').Router();
const {User, Post, Comment} = require('../models');

router.get('/', async(req,res)=>{
    const postData = await Post.findAll({
        where: {
            user_id: req.session.userId
        },
        attributes: ['id', 'title', 'post_text'],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text','post_id', 'user_id' ],
            include: {
                model: User,
                attributes: ['username']
            }
        }]
    }).catch((err)=>{
        res.json(err);
    });
    const posts = postData.map((post)=>post.get({plain:true}));
    res.status(200).json(posts)
});

module.exports = router;