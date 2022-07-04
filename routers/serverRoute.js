//import 
const express = require('express');
const { default: mongoose } = require('mongoose');
const path = require('path');
const controller = require('../controller/controller.js');
const  db  = require('../model_db/db');
//route
const route = express.Router();

const Post = require("../model_db/postModel")
route.get('/', controller.getIndex);


route.get('/create', controller.createPost);
route.get('/own', controller.ownProfile);
route.get('/profile', controller.otherProfile);
route.get('/favorite', controller.favouritePage);
route.get('/viewOwn', controller.getOwn);
route.get('/viewOther', controller.getPost);
route.get('/settings', controller.changeSetting);
route.get('/goCreate', controller.redirectCreate);
route.get('/setting', function(req, res){
    res.render('changePassword')
})

route.get('/settings/:id', function (req, res) {
    console.log()
})

route.get('/profile/:id', async (req, res) => {
    console.log(req.user)
    var postArr =  await Post.find({user: mongoose.Types.ObjectId(req.params.id)}).populate('user', 'full_name').lean().exec()
    var middleIndex = Math.ceil(postArr.length / 2);
    var firstHalf = postArr.splice(0, middleIndex);   
    var secondHalf = postArr.splice(-middleIndex);
    console.log(secondHalf)
    res.render('selfProfile', {user: req.user, postOne: firstHalf, postTwo: secondHalf})
})

route.post('/api/create', function (req,res) {
    let {image} = req.files
    var imgFilename = new Date().getTime()+"_"+image.name
    var newPost =  new Post({
        postTitle: req.body.title ,
        user: mongoose.Types.ObjectId(req.user._id),
        postImg: imgFilename,
        postDescription: req.body.description,
    })
    //note to self: need to change second params of path.resolve due to dirname
    image.mv(path.resolve(__dirname,'../public/images/post', imgFilename), async (err)=>{
        await newPost.save()
        res.render('createPost', {user: req.user})
    })
})

route.get('/post/:id', async(req, res)=>{
    var thisPost = await Post.findOne({_id: mongoose.Types.ObjectId(req.params.id)}).populate('user', 'full_name').lean().exec()
    console.log(thisPost)
    res.render('viewOwn', {activeUser: req.user, post: thisPost})
})

route.get('/home', async(req, res)=>{
    var postArr =  await Post.find({}).populate('user', 'full_name userImg').lean().exec()

    const chunks = [[],[],[]];
    var num = 0;

    for (let index = 0; index < postArr.length; index++) {
        chunks[num].push(postArr[index])
        if (num==2){
            num=0
        }
        else{num = num +1}
        
    }
   


    var firstThree = chunks[0]
    var middleThree = chunks[1]
    var secondThree = chunks[2]
    console.log(secondThree)
    res.render('allPost', {user: req.user, postOne: firstThree, postTwo: middleThree, postThree: secondThree})
});

module.exports = route;