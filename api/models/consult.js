const mongoose = require('mongoose');

const consultSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	consult: { type: String, required: true },
	b_item_id: { type: String, required: true },
	status: { type: String, required: true },
	date_record: {}
});

module.exports = mongoose.model('Consult', consultSchema);