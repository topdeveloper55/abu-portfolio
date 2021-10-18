const mongoose = require('mongoose');
const Schema = mongoose.Schema;

contactSchema = new Schema( {
    firstName: String,
    lastName: String,
    contactNumber: String,
	emailAddress: String,
	message: String,
	createdAt: {
		type: Date,
		default: Date.now
	}
}),
Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;