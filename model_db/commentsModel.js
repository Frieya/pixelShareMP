var mongoose = require('mongoose');


var commentSchema = new mongoose.Schema({
    // your code here
    post_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: {type: String, require: true},
    comment: {type: String, require: true},
    
});

module.exports = mongoose.model('Comments', commentSchema);