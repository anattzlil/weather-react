var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    name: String,
    text: String
})

var Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;