/**
 * Created by deniskashuba on 30.05.16.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// define the schema for our user model
var About = new Schema({

	id: String,
	H3_topBox: String,
	text_topBox: String,
	imageUrl_topBox: String,
	H3_bottomBox: String,
	text_bottomBox: String,
	staff: [],
	list_careers: []

});

module.exports = mongoose.model('About', About);
