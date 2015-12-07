var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var urlModel = new Schema({
    url: String,
    segment: String,
    created_at: Date
});

var Url = mongoose.model("Url", urlModel);

module.exports = Url;