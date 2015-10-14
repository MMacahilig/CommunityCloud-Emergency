var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userService = require('../services/user-service');

var alertSchema = new Schema({
    AlertType: String,
    details: String,
    location: String,
    rating: String,
    createdBy: String,
    createdId: Schema.ObjectId,
    created: {type: Date, Default: Date.now()}
});


var Alert = mongoose.model('Alert', alertSchema);

module.exports = {
    Alert: Alert
};