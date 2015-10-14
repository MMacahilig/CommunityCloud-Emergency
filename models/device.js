var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceSchema = new Schema({
    alertType: String,
    details: String,
    location: String,
    rating: String,
    createdBy: Schema.ObjectId,
    created: {type: Date, Default: Date.now()}
});


var Device = mongoose.model('Device', deviceSchema);

module.exports = {
    Device: Device
};
