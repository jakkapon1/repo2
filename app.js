const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const { Pool } = require('pg')


const patientRoutes = require('./api/routes/cvro/patient');
const visitRoutes = require('./api/routes/cvro/visit');
const orderRoutes = require('./api/routes/cvro/order');
const labRoutes = require('./api/routes/cvro/lab');
const userRoutes = require('./api/routes/user/user');
const consultRoutes = require('./api/routes/cvro/consult');



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const options = {
	useNewUrlParser: true,
	user: 'xxx',
	pass: 'xxx',
	dbName: 'xxx'
};

mongoose.connect('mongodb://localhost:27017/admin',options);


app.use((req, res, next) => {
	res.header('Access-control-Allow-Origin','*');
	res.header('Access-control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS'){
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATH, DELETE, GET');
		return res.status(200).json({});
	}
	
	next();
});

app.use('/patient', patientRoutes );
app.use('/visit', visitRoutes );
app.use('/order', orderRoutes );
app.use('/lab', labRoutes );
app.use('/consult', consultRoutes );
app.use('/user555', userRoutes );




module.exports = app;