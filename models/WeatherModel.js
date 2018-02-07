var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commentSchema = require('./CommentModel')

var weatherSchema = new Schema({
    city: String,
    temp: Number,
    condition: String,
    icon: String,
    comments:[{type: Schema.Types.ObjectId, ref: 'comment'}]
})

var Weather = mongoose.model('weather', weatherSchema);

module.exports = Weather;
