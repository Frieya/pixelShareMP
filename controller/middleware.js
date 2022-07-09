const user = require('../model_db/userModel');


let middleware = {
    authUser: function (req,res,next) {
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/signin");
    }
}

module.exports = middleware;