var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Beer = require('../model/beerModel');


router.use(bodyParser.urlencoded({ extended: true }));


router.route('/beers/:beerId/rating')
	.post(function(req, res) {

		var newRating = req.body;
		console.log('New Rating:', newRating);
		
		// Find beer by beerId
		mongoose.model('Beer').findById({
			_id: req.params.beerId
		}, function(err, beer) {
			if(err) {
				res.send(err);
			}
			
		// Add newRating to the beer's ratings array
		beer.ratings = beer.ratings || [];
		beer.ratings.push({
			tasting_notes: newRating.tasting_notes,
			overall: newRating.overall,
			user_id: newRating.user_id
			//TODO: After passport is completed
		})
		
		// Save the updated beer back to the DB
		
		beer.save(function(err, beer) {
				if(err)
					res.send(err);
					
					res.json({ message: "Beer was updated"});
			});

		});
	})		
	
router.route('/')
	.get(function(req, res){
		mongoose.model('Beer').find({}, function(err, beer){
			if(err){
				return console.log('err');
			} else {
				res.json(beer);
			}
		});
	})



router.route('/:id')
	

	.get(function(req, res) {
		mongoose.model('Beer').findById({
			_id: req.params.id
		}, function(err, beer) {
			if(err)
				res.send(err);
				res.json(beer);
		});
	})

.put(function(req, res) {
		mongoose.model('Beer').findById(req.params.id, function(err, beer){
			if(err)
				res.send(err);
	
			// beer.ratings.push(res.body)

			beer.rating.tasting_notes = req.body.tasting_notes;
			beer.rating.overall = req.body.overall;
			// beer.rating[0].user_id = req.body.user_id;

			console.log(JSON.stringify(beer));

			beer.save(function(err) {
				if(err)
					res.send(err);
					res.json({ message: "Beer was updated"});
			});

		});
	})

//get all ratings by beer ID

	.delete(function(req, res) {
		mongoose.model('Beer').remove({
			_id: req.params.id
		}, function(err, beer) {
			if(err)
				res.send(err);
				res.json({ message: 'Successfully Deleted'});
		});
	});

module.exports = router;