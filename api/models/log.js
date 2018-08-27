const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	url: {},
	reqlogheader: {},
	reqlogbody: {},
	reslog: {},
	status: { type: String },
	date_record: {}
});

module.exports = mongoose.model('Log', logSchema);