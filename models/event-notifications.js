var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var eventNotificationSchema = new Schema({
    UserId: Schema.ObjectId,
    createdBy: Schema.ObjectId,
    dismissed: Boolean,
    created: {type: Date, Default: Date.now()}
});


var EventNotification = mongoose.model('EventNotification', eventNotificationSchema);

module.exports = {
    EventNotification: EventNotification
};