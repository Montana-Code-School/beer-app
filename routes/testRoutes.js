var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Test = require('../model/testModel');

router.use(bodyParser.urlencoded({ extended: true }));

router.route('/')
	.get(function(req, res){
		mongoose.model('Test').find({}, function(err, test){
			if(err){
				return console.log('err');
			} else {
				res.json(test);
			}
		});
	})
	.get(function(req, res){
		mongoose.model('User').find({}, function(err, test){
			if(err){
				return console.log('err');
			} else {
				res.json(test);
			}
		});
	})


.post(function(req, res){
   var name = req.body.name;
   var user = req.user;

   mongoose.model('Test').create({
     name: name,
     user_id: user,

   }, function(err, blogPost){
     if(err){
       res.send("That's Right")
     } else{
       console.log(user_id);
       res.send(blogPost);
     }
   });
 });

module.exports = router;