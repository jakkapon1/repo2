const express = require('express');
const router = express.Router();
const { Pool } = require('pg')

const labController = require.main.require('./api/controllers/cvro/labController');
const checkAuth = require.main.require('./api/middlewares/cvro/check-auth');


router.post('/', checkAuth, labController.patient_lab );

router.post('/chose_print', checkAuth,labController.patient_lab_chose_print);


module.exports = router;