var express = require('express');
var app = express();
var port =  3007;
var mongoose = require('mongoose');
var Q = require('q');
mongoose.connect('mongodb://localhost/practice1');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
  console.log('connected to Mongo DB');
});


var fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
    unique: true
  },
  quantity: Number,
  color: String
});

fruitSchema.methods.speak = function () {
  console.log('We are ', this.name);
};

var Fruit = mongoose.model('Fruit', fruitSchema);


var apple = new Fruit({name:'apple', quantity:2, color: 'Red'});

apple.save(function(err,apple) {
  if (err) {
    return console.error(err);
  }
  apple.speak();
});

var pear = new Fruit({name:'pear', quantity:5, color: 'Yellow'});

pear.save(function(err,pear) {
  if (err) {
    return console.error(err);
  }
  pear.speak();
});

Fruit.find(function(err, fruits) {
  if (err) {
    return console.error(err);
  }
  console.log('haha', fruits);
})


Fruit.remove({}, function(err, fruits) {
  if (err) {
    return console.error(err);
  };
 //Remove all the documents that match!
});



app.listen(port, function() {
  console.log("Listening on port " + port + "...");
});

