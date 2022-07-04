//import 
const express = require('express');
const controller = require('../controller/controller.js')
const auth_control = require('../controller/authController.js')
const bodyParse = require('body-parser')
const passport = require('passport')
const db = require('../model_db/db')
//route
const route = express.Router();
//model
const User = require('../model_db/userModel');


route.get('/signin', controller.getSignIn);
route.get('/signup', controller.getSignUp);
route.get('/signout', (req, res) =>{
    req.logout();
    res.redirect('/');
});

route.post("/signin",passport.authenticate("local",{
    successRedirect:"/home",
    failureRedirect:"/signin"
}),function (req, res){
});


route.post('/signup', (req,res) =>{
    console.log(req.body)
    var newUser = new User({
        full_name: req.body.name,
        username: req.body.email,
        password: req.body.password,
        birthdate: new Date('01/01/1900'),
        userImg: "image.png"
    });
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.redirect("/signup");
        }
    passport.authenticate("local")(req,res,function(){
        console.log("Following User has been registerd");
        console.log(user)
        res.redirect("/home");
    })    
    })
    
});
module.exports = route;