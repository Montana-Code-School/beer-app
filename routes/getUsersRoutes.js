var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('../model/user');

router.use(bodyParser.urlencoded({ extended: true }));

router.route('/')
    .get(function(req, res){
        mongoose.model('User').find({}, function(err, user){
            if(err){
                return console.log('err');
            } else {
                res.json(user);
            }
        });
    })

router.route('/:id')
    .get(function(req, res) {
        mongoose.model('User').findById({
            _id: req.params.id
        }, function(err, user) {
            if(err)
                res.send(err);
                res.json(user);
        });
    })
    
module.exports = router;
