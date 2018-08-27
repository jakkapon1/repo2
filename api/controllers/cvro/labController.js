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


var number_array = 0;
var query = '';


exports.patient_lab = (req, res, next) =>{	
	pool.query('select * from t_cvro_result_lab where t_visit_id  = $1 and patient_hn = $2 and patient_mobile_phone = $3', [jsesc(req.body.t_visit_id), jsesc(req.body.patient_hn), jsesc(req.body.patient_mobile_phone) ])
   .then(visit => {
		Log.success(req, '/lab') ;
		res.status(200).json({
			result: visit.rows		
		}) 
		/*console.log(req.body);*/
	})
	.catch(e => {
		Log.failed(req, '/lab') ;
		console.error(e.stack);
		});
}

exports.patient_lab_print = (req, res, next) =>{	
	pool.query('select * from t_cvro_result_lab where t_visit_id  = $1 and patient_hn = $2 and patient_mobile_phone = $3', [jsesc(req.body.t_visit_id), jsesc(req.body.patient_hn), jsesc(req.body.patient_mobile_phone) ])
   .then(visit => {
	    Log.success(req, '/lab/??') ;
		res.status(200).json({
			result: visit.rows		
		}) 
		/*console.log(req.body);*/
	})
	.catch(e => {
		Log.failed(req, '/lab/??') ;
		console.error(e.stack);
		});
}


exports.patient_lab_chose_print = (req, res, next) =>{
	if (Array.isArray(req.body.t_order_id)) {
		number_array = 0;
		query = '';
		val = '';
        for (var i in req.body.t_order_id) {
			if (number_array == 0){
				query = 'select * from t_cvro_result_lab where t_order_id  = $1'
				number_array ++;
			}else{
				val = ' or t_order_id = $'+String(number_array+1); 
				query = query+val;
				number_array ++;
			}
		}
		req.body.t_order_id[number_array] = req.body.patient_hn;
		req.body.t_order_id[number_array+1] = req.body.patient_mobile_phone;
		pool.query(query+' and patient_hn = $'+String(number_array+1)+' and patient_mobile_phone = $'+String(number_array+2), req.body.t_order_id)
		.then(lab => {
			Log.success(req, '/lab/chose_print') ;
			res.status(200).json({
				result: lab.rows		
				}) 
			/*console.log(req.body);
			console.log(query);*/
			})
		.catch(e => {
		Log.failed(req, '/lab/chose_print') ;
		console.error(e.stack);
		});	
    }else{
		
	}		
}