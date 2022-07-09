if (process.env.NODE_ENV!= 'production'){
    require('dotenv').config()
}

//imports frameworks/libraries
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('passport')
const db = require('./model_db/db')
const session = require('express-session')
const passportLocal = require('passport-local')
const storeMongo = MongoDBStore = require('connect-mongodb-session')(session);
const fileupload = require('express-fileupload')
const handlebars = require('handlebars')
const fetch = require('node-fetch');
const flash = require('connect-flash');
//express app
const app = express();
const PORT = process.env.PORT || 3000;

//engine "hbs"
app.engine('hbs', exphbs.engine({
    extname: ".hbs",
    defaultView: 'main',
    layoutsDir:  path.join(__dirname, 'views/layouts'),
    partialDir: path.join(__dirname, 'views/partials')
}));

//setting engine to hbs
app.set('view engine', '.hbs');

//config for api handling
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
//config to load static files
app.use(express.static('public'));
app.use(fileupload())
app.use(flash());
//routes
const serverRoute = require('./routers/serverRoute');
const authorizeRoute = require('./routers/authorizeRoute');


app.use(session({
    secret:"ccapdev2022",       
    resave: false,      
    saveUninitialized: false, 
    store: new storeMongo({
        uri: 'mongodb+srv://admin:qfR8QDbzrrqTLFhZ@cluster0.5wpivqh.mongodb.net/?retryWrites=true&w=majority'
    }),   
    
}));

db.connect()

var hbs = exphbs.create({})

hbs.handlebars.registerHelper('isActiveUser', function(isUser, user){
    userOne = isUser.toString()
    userTwo = user.toString()
    return userOne==userTwo
})


//passport Auth
const User = require('./model_db/userModel');
const { prototype } = require('stream');




passport.use(new passportLocal({ usernameField: 'email'}, User.authenticate()));

passport.serializeUser(function(user, done) {
    done(null, user.id);
 });
 
 passport.deserializeUser(function(id, done) {
    User.findOne({_id:id}, 'full_name username birthdate userImg',function(err, user) {
        done(err, user.toJSON())})
 });

app.use(passport.initialize())
app.use(passport.session())

handlebars.registerHelper('ifIsZero', function(value, options) {
    if(value === 0) {
      return options.fn(this);
    }
    return options.inverse(this);
  });


app.use('/', serverRoute);
app.use('/', authorizeRoute);

//listening to the port provided
app.listen(PORT, function(){
    console.log('App listens at port ' +  PORT);
})