var port = process.env.port || 7777;
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var shortid = require("shortid");

var db = mongoose.connect("mongodb://localhost/urlData");
var Url = require("./urlModel");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use(express.static(__dirname + './public'));

app.get("/", function (req, res) {
    res.sendfile("index.html");
});

app.post('/', function(req, res) {
	// Declare variables
    var url, id;

    // Get URL
    url = 'www.youtube.com';

    // Create a hashed short version
    id = shortid.generate();

    var newUrl = Url({
    	url: url,
    	segment: id
    });

    newUrl.save(function(err) {
	  if (err) throw err;
	  console.log('Url created!');
	});
});

app.get('/:segment', function(req, res) {
	var id = req.params.segment.trim();
	Url.find({ segment: id }, function(err, data) {
		if (err) throw err;

		// object of the user
		data.forEach(function(element, index, array) {
			res.json(element.url);
		}); 
	});
});

app.listen(port, function () {
    console.log("server is running on " + port);
});