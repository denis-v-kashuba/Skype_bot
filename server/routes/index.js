var ServiceLocatorObj = require('../lib/serviceLocator');

var async = ServiceLocatorObj.get('async');
var _ = ServiceLocatorObj.get('underscore');

var AuthRoutes = ServiceLocatorObj.get('/server/routes/auth/auth.js');
var AboutRoutes = ServiceLocatorObj.get('/server/routes/about/about.js');

var Routes = [];
combineInto(AuthRoutes, Routes);
combineInto(AboutRoutes, Routes);


module.exports = function(app) {

	_.each(Routes, function(route) {

		if (route && route.authToUse != false) {
			route.middleware.unshift(isLoggedIn);
		}

		var args = _.flatten([route.path, route.middleware]);

		switch(route.httpMethod.toUpperCase()) {
			case 'GET':
				app.get.apply(app, args);
				break;
			case 'POST':
				app.post.apply(app, args);
				break;
			case 'PUT':
				app.put.apply(app, args);
				break;
			case 'DELETE':
				app.delete.apply(app, args);
				break;
			case 'SYS:USEALL':
				app.use.apply(app, args);
				break;
			default:
				throw new Error('Invalid HTTP method specified for route ' + route.path);
				break;
		}
	});

}

/*

 Combine two arrays in to last passed

 */
function combineInto(a,b) {
	var len = a.length;
	for (var i=0; i < len; i=i+5000) {
		b.unshift.apply( b, a.slice( i, i+5000 ) );
	}
}


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');

}