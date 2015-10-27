var mongoose = require ('mongoose');

var BeerSchema = new mongoose.Schema({
	name: String,
	category: String,
	ibu: String,
	abv: String,
	brewery: String,
	description: String
});

module.exports = mongoose.model('Beer', BeerSchema);