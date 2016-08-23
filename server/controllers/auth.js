/**
 * Created by deniskashuba on 27.09.15.
 */
var ServiceLocatorObj = require('../lib/serviceLocator');

var passport = ServiceLocatorObj.get('passport');

module.exports = {

	register: function(req, res, next) {

		passport.authenticate('local-signup', {
			successRedirect : '/home', // redirect to the secure home section
			failureRedirect : '/signup', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		})(req, res, next);

	},

	login: function(req, res, next) {

		passport.authenticate('local-login', {
			successRedirect : '/home', // redirect to the secure home section
			failureRedirect : '/login', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		})(req, res, next);

	},

	logout: function(req, res) {
		//req.logout();
		//res.send(200);

		req.logout();
		res.redirect('/');

	}
};