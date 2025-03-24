const express=require('express');
const routes=express.Router();
const {ValidateToken}=require('../middleware/middleware');
const {CreateAccout, Login, Account}=require('../controller/user');
const jwt=require('jsonwebtoken')
const { response, VerifyToken } = require('../helperfunctions/misc');
const { CreatePost, AddComment, LoadComment ,AddReply, LoadPost} = require('../controller/post');
const multer = require("multer");
const { interactions } = require('../controller/interactions');
const upload = multer();

routes.post('/auth',async (req,res)=>{
    const info=await jwt.decode(req.body.token,{complete:true});
    res.status(200).json(response(info));
});


routes.post('/createaccount',CreateAccout);
routes.post('/login',Login);


routes.use(ValidateToken);
routes.post('/post',upload.single("media"),CreatePost);
routes.post('/addcomment',AddComment);
routes.post('/loadcomment',LoadComment);
routes.get('/loadpost/:id?',LoadPost);
routes.post('/interaction/:id',interactions);

routes.get('/account/:username?',Account);
module.exports=routes;