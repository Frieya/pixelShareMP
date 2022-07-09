//import 
const { default: mongoose } = require('mongoose');
const path = require('path');
const  db  = require('../model_db/db');
const Fuse = require('fuse.js')

//models
const Post = require("../model_db/postModel")
const User = require("../model_db/userModel")
const Comment = require("../model_db/commentsModel")

const controller = {
    getIndex  : function (req, res){
        res.render('indexPage');
    },
    getHome  : async(req, res)=>{
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
        res.render('allPost', {user: req.user, postOne: firstThree, postTwo: middleThree, postThree: secondThree})
    },
    createPost: function (req, res) {
        res.render('createPost', {user: req.user});
    },
    getSettings : function (req, res) {
        res.render('changeSetting', {user: req.user})
    },
    getProfile: async (req, res) => {
        var userprofile = await User.findById(req.params.id).lean().exec()
        var postArr =  await Post.find({user: mongoose.Types.ObjectId(req.params.id)}).populate('user', 'full_name').lean().exec()
        var middleIndex = Math.ceil(postArr.length / 2);
        var firstHalf = postArr.splice(0, middleIndex);   
        var secondHalf = postArr.splice(-middleIndex);
        res.render('selfProfile', {user: req.user, profileuser:userprofile, postOne: firstHalf, postTwo: secondHalf})
    },
    postCreate: function (req,res) {
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
    },
    viewPost: async(req, res)=>{
        var thisPost = await Post.findOne({_id: mongoose.Types.ObjectId(req.params.id)}).populate('user', 'full_name').populate({path:'comments', populate: {path: 'user',  select: 'full_name userImg'}}).lean().exec()
        res.render('viewOwn', {active_user: req.user, post: thisPost, logged_in:req.user._id})
    },
    changePic : function (req, res) {
        let {image} = req.files
        var imgFilename = new Date().getTime()+"_"+image.name
        image.mv(path.resolve(__dirname,'../public/images/profilePicture', imgFilename), async (err)=>{
            db.updateOne(User,{_id: mongoose.Types.ObjectId(req.user._id)},{userImg: imgFilename}, (err)=>{
                res.redirect('/settings/'+req.user._id)
            })
            
        })
    },
    changeUP: function(req, res){
        db.updateOne(User,{_id: mongoose.Types.ObjectId(req.user._id)},req.body, (err)=>{
            res.redirect('/settings/'+req.user._id)
        })
    },
    addComment: function(req,res) {
        Comment.create({...req.query, user: mongoose.Types.ObjectId(req.user._id)}, function (err, result) {
            if(err) return null;
            else {
                idComment = result._id
                Post.updateOne(
                    { _id: req.query.post_id }, 
                    { $push: { comments: idComment } },
                    async(error, result)=>{
                        if (error)
                            return null
                        else{
                            commentPlace = await Comment.findById(idComment).populate('user', 'full_name userImg').lean().exec()
                            res.render("../views/partials/comment", {comments: commentPlace})
                        }
    
                    })
            }
    
        })
    },
    postDelete: async(req, res)=>{
        idPost = req.params.id
        deletePost = await Post.findById(idPost)
        if (deletePost==null)
            res.send(false)
        else if (deletePost.user.equals(req.user._id)){
            db.deleteOne(Post, {_id: idPost}, function(success){
                res.send(success);
                
            })
             
        }
    },
    commentDelete: async(req, res)=>{
        idComment = req.params.id
        deleteComment = await Comment.findById(idComment)
        if (deleteComment==null)
            res.send(false)
        else if (deleteComment.user.equals(req.user._id)){
            Post.updateOne({_id: deleteComment.post_id},{ $pull: { comments: deleteComment._id} }, function(err, campground){
                if(err)
                    res.send(false)
                else {
                    db.deleteOne(Comment, {_id: deleteComment._id}, function(success){
                        res.send(success);
                    });
                }
    
            })
             
        }
    },
    changePass: function(req, res) {
    
        User.findById(req.user._id,(err, user) => {
            // err checking if there is connection
            if (err) {
              res.send({ success: false, message: 'Something went wrong!! Please try again after sometimes.'}); // Return err
            } else {
              // user in db?
              if (!user) {
                res.send({ success: false, message: 'User not found' }); // Return error, user was not found in db
              } else {
                user.changePassword(req.body.oldPassword, req.body.newPassword, function(err) {
                   if(err) {
                            if(err.name == 'IncorrectPasswordError'){
                                 res.send({ success: false, message: 'Incorrect old password' }); // Return error
                            }else {
                                res.send({ success: false, message: 'Something went wrong!! Please try again after sometimes.' });
                            }
                  } else {
                    res.send({ success: true, message: 'Your password has been changed successfully' });
                   }
                 })
              }
            }
          });
    },
    getSearch: async(req, res)=>{
        var postArr =  await Post.find({}).populate('user', 'full_name userImg').lean().exec()
        const fuse = new Fuse(postArr, {threshold: 0.3, keys: ["postTitle"]});
        var returnArr = fuse.search(req.params.searchIndex)
        const chunks = [[],[],[]];
        var num = 0;
        console.log(returnArr)
        for (let index = 0; index < returnArr.length; index++) {
            chunks[num].push(returnArr[index])
            if (num==2){
                num=0
            }
            else{num = num +1}
            
        }
        var firstThree = chunks[0]
        var middleThree = chunks[1]
        var secondThree = chunks[2]
        console.log(firstThree)
        res.render('allPostSearch', {user: req.user, postOne: firstThree, postTwo: middleThree, postThree: secondThree,searchIndex: req.params.searchIndex})
    }

}

module.exports  = controller