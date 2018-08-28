const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require.main.require('./api/models/user');

mongoose.connect('mongodb://localhost:27017/admin',{user:process.env.MONGOUSER,pass:process.env.MONGOPASSWORD,dbName:process.env.MONGODATABASE,useNewUrlParser: true});

router.post('/signup', (req, res, next) => {
	User.find({email: req.body.email})
	.exec()
	.then(user => {
		if (user.length >= 1) {
			return res.status(422).json({
				massage: 'Mail exist'
			});
		}else{
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				if (err) {
					return res.status(500).json({
					error: err
				});
				} else {
					const user = new User({
					_id: new mongoose.Types.ObjectId(),
					email: req.body.email,
					password: hash
					});
					user
					.save()
					.then(result => {
						res.status(201).json({
							message: 'User created'
						});
					})
					.catch(err => {
						console.log(err);
						res.status(500).json({
							error: err
						});
					});
				}
			});
		}
	})
	.catch();	
});

router.post('/login', (req, res, next) => {
	User.find({ email: req.body.email })
	.exec()
	.then(user => {
		if (user.length < 1) {
			return res.status(400).json({
				message: 'Auth failed'
			});
		}
		bcrypt.compare(req.body.password, user[0].password, (err, result) => {
			if(err) {
				return res.status(401).json({
					message: 'Auth failed'
				});
			}
			if (result) {
				const token = jwt.sign({
					email: user[0].email,
					userId: user[0]._id
				}, process.env.JWT_KEY, {expiresIn: 60*30})
				return res.status(200).json({
					message: 'Auth successful',
					token: token
				});
			}
			res.status(401).json({
				message: 'Auth failed'
			});
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});

module.exports = router;