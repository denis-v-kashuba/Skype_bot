/**
 * Created by deniskashuba on 21.08.16.
 */

var ServiceLocatorObj = require('../lib/serviceLocator');

var mongoose = ServiceLocatorObj.get('mongoose');

var Schema = mongoose.Schema;

// define the schema for our user model
var Pointer = new Schema({

	themes: [
		{}
	],
	preferences: {

	}

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Pointer', Pointer);