const { Pool } = require('pg')
const jsesc = require('jsesc');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

var Log = require.main.require('./api/library/log');

exports.patient_order = (req, res, next) =>{	
	pool.query('select * from t_cvro_order where t_visit_id  = $1 and patient_hn = $2 and patient_mobile_phone = $3' , [jsesc(req.body.t_visit_id), jsesc(req.body.patient_hn), jsesc(req.body.patient_mobile_phone) ])
   .then(visit => {
		Log.success(req, '/order') ;
		res.status(200).json({
			result: visit.rows		
		}) 
		/*console.log(req.body);*/
	})
	.catch(e => {
		Log.failed(req, '/order') ;
		console.error(e.stack);
		});
}



exports.patient_order_chose_print = (req, res, next) =>{
	if (Array.isArray(req.body.t_order_id)) {
		number_array = 0;
		query = '';
		val = '';
        for (var i in req.body.t_order_id) {
			if (number_array == 0){
				query = 'select * from t_cvro_order where t_order_id  = $1'
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
		.then(order => {
			Log.success(req, '/order/chose_print') ;
			res.status(200).json({
				result: order.rows		
				}) 
			/*console.log(req.body);
			console.log(query);
			console.log(order.rows);*/
			})
		.catch(e => {
		Log.failed(req, '/order/chose_print') ;
		console.error(e.stack);
		});	
    }else{		
	}
	/*console.log(req.body.t_order_id);*/	
}