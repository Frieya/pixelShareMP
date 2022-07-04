var mongoose = require('mongoose');


var postSchema = new mongoose.Schema({
    // your code here
    postTitle: {type: String, require: true, max: 50},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    postImg: {type: String, require: true },
    postDescription: {type: String, require: false},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref:'Comments'}]
});

module.exports = mongoose.model('Post', postSchema);
