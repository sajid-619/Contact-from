var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect("mongodb://"+process.env.IP+": 27017/node-cw8");

mongoose.connection.on('error', function() {
  console.log("Could not connect to mongodb");
});

//Define userSchema with mongoose
var userSchema = new mongoose.Schema({
  name: {type: String, required: "Name is required"},
  email: String
});

var User = mongoose.model('User', userSchema);

var save = function (form_data) {
  db.createCollection('users', function(err, collection) {});
  var collection = db.collection('users');
  collection.save(form_data);
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var server = http.Server(app);

app.get('/', function(req, res) {
  res.sendFile(__dirname+'/index.html');
});


app.post('/submit_user', function(req, res) {
   console.log(req.body);
   var newUser = new User(req.body);
   newUser.save(function(err, data) {
     if (err) {
       return res.status(400).json({message: "Could not save user"})
     }
     res.status(200).json(data);
   });
   //save(req.body);
   //res.status('200');
});
server.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server running');
});