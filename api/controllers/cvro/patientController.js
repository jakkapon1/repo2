const { Pool } = require('pg')
const jsesc = require('jsesc');

var Log = require.main.require('./api/library/log');


const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

exports.patient_patient = (req, res, next) =>{	
	pool.query('select patient_firstname, patient_lastname, patient_birthday, sex_description, patient_hn from t_cvro_patient where t_visit_id = $1 and patient_hn = $2', [jsesc(req.body.t_visit_id),jsesc(req.body.patient_hn)])
   .then(visit => {
		Log.success(req, '/patient') ;
		res.status(200).json({
			result: visit.rows[0]		
		}) 
		/*console.log(req.body);*/
	})
	.catch(e => {
		Log.failed(req, '/patient') ;
		console.error(e.stack);
		});
}

exports.patient_phone = (req, res, next) =>{	
	pool.query('select patient_mobile_phone from t_cvro_patient where patient_hn = $1', [jsesc(req.body.patient_hn)])
   .then(visit => {
	    Log.success(req, '/patient/getPhone') ;
		res.status(200).json({
			result: visit.rows[0]		
		}) 
		/*console.log(req.body);*/
	})
	.catch(e => {
		/*Log.failed(req, '/patient/getPhone') ;*/
		console.error(e.stack);
		});
}