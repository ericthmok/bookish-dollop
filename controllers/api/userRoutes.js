const router = require('express').Router();
const { User, Post, Comment} = require('../../models');
const bcrypt = require('bcrypt');

router.get('/', async(req,res)=>{
    const userData = await User.findAll().catch((err)=>{
        res.json(err);
    });
    const users = userData.map((user)=>user.get({plain: true}));
    res.render('homepage', {users});
})

router.post('/new', async(req, res)=>{
    try{
        const newData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        req.session.save(()=>{
            req.session.loggedIn = true;
            res.status(200).json(newData)
        });
    }catch(err){
        console.log(err);
        res.status(400).json(err);
    }
});

router.post('/login', async(req,res)=>{
    try{
        const logIn = await User.findOne({where:{email: req.body.email}});
        if(!logIn){
            res.status(404).json({messaage:'Wrong Info'});
            return;
        }
        const correctPassword = await bcrypt.compare(
            req.body.password,
            logIn.password
        );
        if (!correctPassword){
            res.status(400).json({message:'Wrong Info'});
            return;
        }
        req.session.save(()=>{
            req.session.loggedIn = true;
            req.session.userId = logIn.id
            res.status(200).json({user: logIn, message:'Logged In'});
        });
    }catch(err){
        res.status(500).json(err);
    }
});

router.delete('/logout', (req, res)=>{
    if (req.session.loggedIn){
        req.session.destroy(()=>{
            res.status(204).end();
        });
    }else{
        res.status(404).end();
    }
});

module.exports = router;