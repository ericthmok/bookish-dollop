const { Post } = require ('../models')

const postData = [


];

const postSeed = () => Post.bulkCreate(postData);

module.exports = postSeed;