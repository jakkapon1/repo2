const mongoose = require("mongoose")

const options = {
	useNewUrlParser: true,
	user: process.env.MONGOUSER,
	pass: process.env.MONGOPASSWORD,
	dbName: process.env.MONGODATABASE
};

mongoose.connect('mongodb://localhost:27017/admin',options);

const Log = require.main.require('./api/models/log');



function success(req, url) { 
	var date = new Date().toISOString(); 
    const log = new Log({
					_id: new mongoose.Types.ObjectId(),
					url: url,
					reqlogheader: req.headers,
					reqlogbody: req.body,
					status: "success",
					date_record: date
					});
					log.save();
}

function failed(req, url) {
	var date = new Date().toISOString(); 	
    const log = new Log({
					_id: new mongoose.Types.ObjectId(),
					reqlogheader: req.headers,
					reqlogbody: req.body,
					status: "fail",
					date_record: date
					});
					log.save();
}


module.exports.success = success;
module.exports.failed = failed;