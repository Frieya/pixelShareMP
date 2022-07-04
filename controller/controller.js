

const controller = {
    getIndex  : function (req, res){
        res.render('indexPage');
    },
    getSignIn  : function (req, res){
        res.render('signIn');
    },
    getSignUp  : function (req, res){
        res.render('signUp');
    },
    getPost : function (req, res) {
        res.render('viewPost')
    },
    getHome  : function (req, res){
        console.log(req.user);
        res.render('allPost', {user: req.user});
    },
    getOwn : function (req, res) {
        res.render('viewOwn')
    },
    createPost: function (req, res) {
        res.render('createPost', {user: req.user});
    },
    changeSetting: function (req, res) {
        res.render('changeSetting')
    },
    favouritePage: function (req, res) {
        res.render('favoritesProfile')
    },
    otherProfile : function (req, res) {
        res.render('otherProfile')
    },
    ownProfile : function (req, res) {
        res.render('selfProfile')
    },
    redirectCreate: function (req, res){
        res.redirect('/create');
        
    }
}

module.exports  = controller