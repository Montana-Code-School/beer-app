var mongoose = require ('mongoose');

var RatingSchema = new mongoose.Schema({
	beer_id: String,
	tasting_note: ["malty", "breadlike", "rich", "deep", "roasty", "cereal", "coffeeish", "caramelly", "toffee-like", "molasses-like", "smoky", "sweet", "autumnal","burnt cream", "oatmeal", "rustic", "layered", "piney", "citrusy", "grapefruity", "earthy", "musty", "spicy", "sharp", "bright", "fresh", "herbal", "lemony", "newly-mown lawn", "floral", "springlike", "brilliant", "minty", "pungent", "grassy"],
	overall: { type: Number, min: 0, max: 5 },
	user_id: String
});

module.exports = mongoose.model('Rate', RatingSchema);