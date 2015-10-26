var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var alertNotificationSchema = new Schema({
    UserId: Schema.ObjectId,
    createdBy: String,
    createdId: Schema.ObjectId,
    dismissed: Boolean,
    created: {type: Date, Default: Date.now()}
});


var AlertNotification = mongoose.model('AlertNotification', alertNotificationSchema);

module.exports = {
    AlertNotification: AlertNotification
};