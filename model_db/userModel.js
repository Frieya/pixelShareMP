
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
    // your code here
    full_name: {type: String, require: true, max: 50},
    username: {type: String, require: false},
    password: {type: String, require: true },
    birthdate: {type: Date, require: false},
    userImg: {type: String, require:false}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
