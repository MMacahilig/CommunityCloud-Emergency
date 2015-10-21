var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    alertType: String,
    details: String,
    street: String,
    city: String,
    state: String,
    rating: String,
    createdBy: String,
    createdId: Schema.ObjectId,
    created: {type: Date, Default: Date.now()}
});


var Event = mongoose.model('Event', eventSchema);

module.exports = {
    Event: Event
};