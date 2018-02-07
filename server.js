var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/weatherDB', function () {
    console.log("DB connection established!!!")
});

var Weather = require('./models/WeatherModel');
var Comment = require('./models/CommentModel');

var weather1 = new Weather({
    city: 'tel-aviv',
    temp: 25,
    condition: 'bright',
    icon: '',
    comments: []
})

var weather2 = new Weather({
    city: 'london',
    temp: 15,
    condition: 'sunny',
    icon: '',
    comments: []
})

// weather1.save();
// weather2.save();

var app = express();

app.use(express.static('client/node_modules'));
app.use(express.static('client/public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/weather', function (req, res) {
    Weather.find().populate('comments').exec(function (err, data) {
        if (err) {
            throw err
        } else {
            res.send(data)
        }
    })
})

app.post('/weather', function (req, res) {
    console.log(req.body);
    var newWeather = new Weather(req.body);
    console.log(newWeather);
    newWeather.save(function (err, data) {
        if (err) throw err;
        else res.send(data);
    })
})

app.post('/weather/:id/comment', function (req, res) {
    console.log(req.body);
    var newComment = new Comment(req.body);
    console.log(newComment);
    newComment.save();
    Weather.findByIdAndUpdate(req.params.id, {$push: {comments: newComment}}, function (err, data) {
        if (err) throw err;
        else {console.log('updated weather')}
            Weather.findOne({ _id: req.params.id}).populate('comments').exec(function (err, updatedWeather) {
                if (err) return handleError(err);
                res.send(updatedWeather);
            })
    })
})

app.delete('/delete/weather/:id', function(req, res) {
    let id = req.params.id;
    Weather.findByIdAndRemove(id, function(err, object){
        if (err) throw err;
        else res.send(object);
    })
}) 

app.delete('/delete/weather/:weatherId/comments/:commentId', function(req, res){ 
    let weatherId = req.params.weatherId;
    let commentId = req.params.commentId;
    console.log(weatherId);
    console.log(commentId)
    Weather.findByIdAndUpdate(weatherId, {$pull:{comments:{commentId}}}, function(err, newObject){
        if (err) throw err;
        else {
            console.log(newObject);
            res.send(newObject)
        };
    })
})

app.listen(3001, () => console.log('server is running in PORT 3001'))