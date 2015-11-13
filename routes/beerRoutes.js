var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Beer = require('../model/beerModel');

module.exports = function(app, passport){

app.get('/api/beer/', function(req, res){
		mongoose.model('Beer').find({}, function(err, beer){
			if(err){
				return console.log('err');
			} else {
				res.json(beer);
			}
		});
	});

app.post('/api/beer/', function(req, res){

		var newBeer = req.body; //{name:..., image:...}
		mongoose.model('Beer').create(newBeer,
		function(err, beer){
			if(err){
				res.send("not working", err);
			} else {
				console.log("New beer named " + beer + " created!");
				res.send(beer);
			}
		});

	});

app.get('/api/beer/:id', function(req, res) {
		mongoose.model('Beer').findById({
			_id: req.params.id
		}, function(err, beer) {
			if(err)
				res.send(err);
				res.json(beer);
		});
	})

app.put('/api/beer/:id', function(req, res) {
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
			beer.rating = req.body.rating;


			console.log(JSON.stringify(beer));

			beer.save(function(err) {
				if(err)
					res.send(err);
					res.json({ message: "Beer was updated"});
			});

		});
	})

app.delete('/api/beer/:id', function(req, res) {
		mongoose.model('Beer').remove({
			_id: req.params.id
		}, function(err, beer) {
			if(err)
				res.send(err);
				res.json({ message: 'Successfully Deleted'});
		});
	});

}