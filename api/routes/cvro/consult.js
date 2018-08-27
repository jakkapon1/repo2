const express = require('express');
const router = express.Router();
const { Pool } = require('pg')

const consultController = require.main.require('./api/controllers/cvro/consultController');
const checkAuth = require.main.require('./api/middlewares/cvro/check-auth');



router.post('/add', consultController.add );

router.post('/show', consultController.show );

module.exports = router;