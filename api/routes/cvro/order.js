const express = require('express');
const router = express.Router();
const { Pool } = require('pg')

const orderController = require.main.require('./api/controllers/cvro/orderController');
const checkAuth = require.main.require('./api/middlewares/cvro/check-auth');


router.post('/', checkAuth, orderController.patient_order );

router.post('/chose_print', checkAuth,orderController.patient_order_chose_print);

module.exports = router;