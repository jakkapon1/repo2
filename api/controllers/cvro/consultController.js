const mongoose = require("mongoose")
var Log = require.main.require('./api/library/log');



mongoose.connect('mongodb://localhost:27017/admin',{user:process.env.MONGOUSER,pass:process.env.MONGOPASSWORD,dbName:process.env.MONGODATABASE,useNewUrlParser: true});

var Consult = require.main.require('./api/models/consult');



exports.add = (req, res, next) =>{	
	var date = new Date().toISOString(); 
	const consult = new Consult({
					_id: new mongoose.Types.ObjectId(),
					consult: req.body.consult,
					b_item_id: req.body.b_item_id,
					status: '1',
					date_record: date
					});
					consult
					.save()
					.then(result => {
						res.status(201).json({
							message: 'Consult created'
						});
					})
					.catch(err => {
						console.log(err);
						res.status(500).json({
							error: err
						});
					});
}

exports.show = (req, res, next) =>{	
	Consult.find({b_item_id: req.body.b_item_id})
	.select('consult')
	.exec()
	.then(consult => {
		
		res.status(200).json({
			result: consult	
		}) 
		/*console.log(req.body);*/
	})
	.catch(e => {
		
		console.error(e.stack);
		});
}