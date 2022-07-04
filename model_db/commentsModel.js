var mongoose = require('mongoose');


var commentSchema = new mongoose.Schema({
    // your code here
    post_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    commentDescription: {type: String, require: false},
    
});

module.exports = mongoose.model('Comments', commentSchema);