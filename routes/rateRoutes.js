var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var rating = require('../model/ratingModel');

router.use(bodyParser.urlencoded({ extended: true }));

router.route('/')
	.get(function(req, res){
		mongoose.model('Rate').find({}, function(err, rating){
			if(err){
				return console.log('err');
			} else {
				res.json(rating);
			}
		});
	})

	.post(function(req, res){
		var beer_id =  req.body.beer_id;
		var tasting_note = req.body.tasting_note;
		var user_id = req.body.user_id;
		var overall = req.body.overall;
		mongoose.model('Rate').create({
			beer_id: beer_id,
			tasting_note: tasting_note,
			overall: overall,
			user_id: user_id

		},
		function(err, rating){
			if(err){
				res.send("not working");
			} else {
				console.log("New rating aromad " + rating + " created!");
				res.send(rating);
			}
		});
	});

router.route('/:id')
	.get(function(req, res) {
		mongoose.model('Rate').findById({
			_id: req.params.id
		}, function(err, rating) {
			if(err)
				res.send(err);
				res.json(rating);
		});
	})

	.put(function(req, res) {
		mongoose.model('Rate').findById(req.params.id, function(err, rating){
			if(err)
				res.send(err);
			rating.beer_id = req.body.beer_id;
			rating.tasting_note = req.body.tasting_note;
			rating.user_id = req.body.user_id;
			rating.overall = req.body.overall;
			console.log(JSON.stringify(rating));

			rating.save(function(err) {
				if(err)
					res.send(err);
					res.json({ message: "rating was updated"});
			});

		});
	})

	.delete(function(req, res) {
		mongoose.model('Rate').remove({
			_id: req.params.id
		}, function(err, rating) {
			if(err)
				res.send(err);
				res.json({ message: 'Successfully Deleted'});
		});
	});

module.exports = router;
