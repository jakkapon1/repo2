const { Pool } = require('pg')
const mongoose = require("mongoose")
const jsesc = require('jsesc');



var Log = require.main.require('./api/library/log');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

exports.patient_visit = (req, res, next) =>{	
	pool.query('select distinct t_visit_id,patient_hn,visit_begin_visit_time,t_patient_id from t_cvro_visit where patient_hn = $1 and patient_mobile_phone = $2', [jsesc(req.body.patient_hn), jsesc(req.body.patient_mobile_phone)])
   .then(visit => { 
        Log.success(req, '/visit') ;
		res.status(200).json({
			result: visit.rows		
		}) 
		/*console.log(req.body);*/
	})
	.catch(e => {
		Log.failed(req, '/visit') ;
		console.error(e.stack);
		});
}

exports.patient_visit_print = (req, res, next) =>{	
	pool.query('select distinct t_visit_id,patient_hn,visit_begin_visit_time,t_patient_id,contract from t_cvro_visit where t_visit_id = $1 and patient_hn = $2 and patient_mobile_phone = $3', [jsesc(req.body.t_visit_id),jsesc(req.body.patient_hn), jsesc(req.body.patient_mobile_phone)])
   .then(visit => {
	    Log.success(req, '/visit/print') ;
		res.status(200).json({
			result: visit.rows		
		}) 
		/*console.log(req.body);*/
	})
	.catch(e => {
		Log.failed(req, '/visit/print') ;
		console.error(e.stack);
		});
}