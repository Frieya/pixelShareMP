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
//express app
const app = express();
const PORT = 1703;

//engine "hbs"
app.engine('hbs', exphbs.engine({
    extname: "hbs",
    defaultView: 'main',
    layoutsDir:  path.join(__dirname, 'views/layouts'),
    partialDir: path.join(__dirname, 'views/partials')
}));

//setting engine to hbs
app.set('view engine', 'hbs');

//config for api handling
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
//config to load static files
app.use(express.static('public'));
app.use(fileupload())

//routes
const serverRoute = require('./routers/serverRoute');
const authorizeRoute = require('./routers/authorizeRoute');

const storeSession = new storeMongo({
    url: 'mongodb://localhost:27017/pixel_share',
    collection: 'sessions'
})

app.use(session({
    secret:"ccapdev2022",       
    resave: false,      
    saveUninitialized: false, 
    store: storeSession,   
    
}));

db.connect()




//passport Auth
const User = require('./model_db/userModel');




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
    console.log('App listens at port ' + PORT);
})