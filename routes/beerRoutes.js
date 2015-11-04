var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Beer = require('../model/beerModel');

router.use(bodyParser.urlencoded({ extended: true }));

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

	.post(function(req, res){
		var name =  req.body.name;
		var image = req.body.image;
		var category = req.body.category;
		var ibu = req.body.ibu;
		var abv = req.body.abv;
		var location = req.body.location;
		var brewery = req.body.brewery;
		var description = req.body.description;
		mongoose.model('Beer').create({
			name: name,
			image: image,
			category: category,
			ibu: ibu,
			abv: abv,
			location: location,
			brewery: brewery,
			description: description

		},
		function(err, beer){
			if(err){
				res.send("not working");
			} else {
				console.log("New beer named " + beer + " created!");
				res.send(beer);
			}
		});
	});

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
			beer.name = req.body.name;
			beer.image = req.body.image;
			beer.category = req.body.category;
			beer.ibu = req.body.ibu;
			beer.abv = req.body.abv;
			beer.location = req.body.location;
			beer.brewery = req.body.brewery;
			beer.description = req.body.description;
			console.log(JSON.stringify(beer));

			beer.save(function(err) {
				if(err)
					res.send(err);
					res.json({ message: "Beer was updated"});
			});

		});
	})

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