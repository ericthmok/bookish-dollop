const sequelize = require('../config/connections');
const userSeed = require('./userData');
const postSeed = require('./postData');
const commentSeed = require('./commentData');

const seeds = async ()=>{
    await sequelize.sync({ force: true});
    console.log('Database synced');
    await userSeed();
    console.log('Users seeded');
    await postSeed();
    console.log('Posts seeded');
    await commentSeed();
    console.log('Comments seeded');

    process.exit();
};

seeds;