const express = require('express');
const router = express.Router();
const { Pool } = require('pg')

const visitController = require.main.require('./api/controllers/cvro/visitController');
const checkAuth = require.main.require('./api/middlewares/cvro/check-auth');


router.post('/', checkAuth, visitController.patient_visit );


router.post('/print', checkAuth, visitController.patient_visit_print );


module.exports = router;