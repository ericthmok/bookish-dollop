const {Comment} = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id:1,
        comment_text: "1"
    },
    {
        user_id: 2,
        post_id: 2,
        comment_text: "2"
    }
]

const commentSeed = () => Comment.bulkCreate(commentData);

module.exports = commentSeed;