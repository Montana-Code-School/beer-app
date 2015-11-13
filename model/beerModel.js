var mongoose = require ('mongoose');

var BeerSchema = new mongoose.Schema({
	name: String,
	image: String,
	category: String,
	ibu: String,
	abv: String,
	location: String,
	brewery: String,
	description: String,
	averageRating: Number,
	ratings: [{
		tasting_notes: ["malty", "breadlike", "rich", "deep", "roasty", "cereal", "coffeeish", "caramelly", "toffee-like", "molasses-like", "smoky", "sweet", "autumnal","burnt cream", "oatmeal", "rustic", "layered", "piney", "citrusy", "grapefruity", "earthy", "musty", "spicy", "sharp", "bright", "fresh", "herbal", "lemony", "newly-mown lawn", "floral", "springlike", "brilliant", "minty", "pungent", "grassy"],
		overall: { type: Number, min: 0, max: 5 },
		user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	}]
});

module.exports = mongoose.model('Beer', BeerSchema);