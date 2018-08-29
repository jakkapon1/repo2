const express = require('express');
const router = express.Router();
const { Pool } = require('pg')

const patientController = require.main.require('./api/controllers/cvro/patientController');
const checkAuth = require.main.require('./api/middlewares/cvro/check-auth');


router.post('/', checkAuth, patientController.patient_patient );

router.post('/getPhone', patientController.patient_phone );

router.get('/test', (req, res, next) =>{
	return res.status(200).json({
			result: 'success1'		
		})
} );


module.exports = router;