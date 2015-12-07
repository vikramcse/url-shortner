var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var urlModel = new Schema({
    url: String,
    segment: String,
    created_at: Date,
    url_ip: String
});

// on every save, add the date
urlModel.pre('save', function(next) {
	// get the current date
	var currentDate = new Date();

  	// if created_at doesn't exist, add to that field
  	if (!this.created_at)
    	this.created_at = currentDate;

  next();
});

var Url = mongoose.model("Url", urlModel);

module.exports = Url;