var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var contactSchema = new Schema({
    firstName: { type: String, required: 'Please enter your first name'},
    lastName: { type: String, required: 'Please enter your last name'},
    email: { type: String, required: 'Please enter your email'},
    password: { type: String, required: 'Please your password '},
    address:  String,
    city: String,
    postcode: String,
    state: String,
    homePhone: String,
    mobilePhone: String,
    created: {type: Date, Default: Date.now()}
});


var Contact = mongoose.model('Contact', contactSchema);

module.exports = {
    Contact: Contact
};