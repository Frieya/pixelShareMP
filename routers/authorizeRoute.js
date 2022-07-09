//import 
const express = require('express');
const auth_controller = require('../controller/authController.js')
const passport = require('passport')
//route
const route = express.Router();



route.get('/signin', auth_controller.getSignIn);
route.get('/signup', auth_controller.getSignUp);
route.get('/logout', auth_controller.getSignOut);

route.post("/signin",passport.authenticate("local",{
    successRedirect:"/home",
    failureRedirect:"/signin",
    failureFlash : { type: 'error', message: 'Invalid username or password.' }
}),function (req, res){
});


route.post('/signup', auth_controller.postSignUp);
module.exports = route;