var PORT = 8000;
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var ejs = require('ejs');
var app = express();
var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/my_first_database', {
    useMongoClient: true,
});

var UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
});
mongoose.model('User', UserSchema);

mongoose.Promise = global.Promise;
var User = mongoose.model('User');

app.use(bodyParser.urlencoded({extended: true}));
// app.use(session({secret: 'mi_p@55w0rd_3S_muy_r@nd0m050!!y_muy_1337_t@mbi3n'}));

app.use(express.static('static'));

app.set('views', __dirname + '/views');
app.set('viewengine', 'ejs');


app.get('/', function (req, res){
    User.find({}, function(err, users){
        if (err){
            console.log(err, "ERROR!");
            res.redirect("/");
        }
        else {
            res.render('index.ejs', {users: users});
        }
    })
});


app.post('/users', function (req, res){
    console.log("POST DATA: ", req.body);
    var user = new User({name: req.body.name, age: req.body.age});

    user.save(function (err){
        if (err){
            console.log("went wrong!?", err);
        }
        else {
            console.log("success - added user");
            res.redirect('/');            
        }
    })

});
  
app.listen(PORT, function(){
    console.log('listening on port '+PORT);
})
