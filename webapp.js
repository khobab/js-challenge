var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var init = require('./scripts/init.mongo.js');

var app = express();
var db;

app.use(express.static('public'));

/* Get a list of all the products */
app.get('/api/products', function(req, res) {
  db.collection("products").find().toArray(function(err, docs) {
    res.json(docs);
  });
});

app.use(bodyParser.json());


/* Get a single record */
app.get('/api/product/:id', function(req, res) {
  db.collection("products").findOne({id: req.params.id}, function(err, product) {
    res.json(product);
  });
});

/* Modify one record, given its ID */
app.get('/api/cart/toggle/:id', function(req, res) {
  db.collection("products").findOne({id: req.params.id}, function(err, product) {
    product.added = !product.added;
    db.collection("products").save(product, function(err, result){
      res.json(result);
    });
  });
});

app.get('/api/cart/clear', function(req, res) {
  db.collection("products").update({},{$set : {added : false}},{multi : true}, function(err, result) {
    res.json(result);
  });
});

app.get('/api/cart/get', function(req, res) {
  db.collection("products").find({added : true}).toArray(function(err, docs) {
    res.json(docs);
  });
});

MongoClient.connect('mongodb://127.0.0.1/jschallenge', function(err, dbConnection) {
  if(err) {
    console.log("***ERROR: error occurred connecting to mongodb, exiting...***");
    return;
  }

  db = dbConnection;

  var server = app.listen(3000, function() {
    init.initDb(db);

	  var port = server.address().port;
	  console.log("Started server at port", port);
  });
});
