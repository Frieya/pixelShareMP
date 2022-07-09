
//model
const User = require('../model_db/userModel');
const passport = require('passport')


const authController = {
    getSignIn  : function (req, res){
        res.render('signIn', {user: req.user, error: req.flash('error')});
    },
    getSignUp  : function (req, res){
        res.render('signUp');
    },
    getSignOut : function(req, res){
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
          }); 
      },
    postSignUp : async (req,res) =>{
        var newUser = new User({
            full_name: req.body.name,
            username: req.body.email,
            password: req.body.password,
            birthdate: new Date('01/01/1900'),
            userImg: "image.png"
        });
        User.register(newUser,req.body.password,function(err,user){
            if(err){
                res.redirect("/signup");
            }
        passport.authenticate("local")(req,res,function(){
            console.log("Following User has been registerd");
            res.redirect("/home");
        })    
        })
        
    }
}

module.exports = authController;