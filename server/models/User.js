/**
 * Created by deniskashuba on 27.09.15.
 */
var ServiceLocatorObj = require('../lib/serviceLocator');

var mongoose = ServiceLocatorObj.get('mongoose');
var bcrypt = ServiceLocatorObj.get('bcrypt-nodejs');

var Schema = mongoose.Schema;

// define the schema for our user model
var User = new Schema({

	username     		: String,
	password     		: String,
	type				: Number,
	cdate		 		: Date,
	udate		 		: Date

});

//User.methods.findOne = function(params, callback) {
//
//	DbObj.findOne(User, params, callback);
//
//};

// methods ======================
// generating a hash
User.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
User.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', User);