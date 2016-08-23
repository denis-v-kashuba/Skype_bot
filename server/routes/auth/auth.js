/**
 * Created by deniskashuba on 27.09.15.
 */
var ServiceLocatorObj = require('../../lib/serviceLocator');

var AuthCtrl = ServiceLocatorObj.get('/server/controllers/auth');

var Routes = [

//===============ROUTES=================
//displays our homepage

	{
		path: '/',
		httpMethod: 'GET',
		authToUse : false,
		middleware: [function (req, res) {

			res.render('home');

		}]
	},

// =====================================
// LOGIN ===============================
// =====================================
// show the login form
	{
		path: '/login',
		httpMethod: 'GET',
		authToUse : false,
		middleware: [function (req, res) {

			// render the page and pass in any flash data if it exists
			res.render('login.ejs', { message: req.flash('loginMessage') });

		}]
	},

	{
		path: '/login',
		httpMethod: 'POST',
		authToUse : false,
		middleware: [AuthCtrl.login]
	},

// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form

	{
		path: '/signup',
		httpMethod: 'GET',
		authToUse : false,
		middleware: [function (req, res) {

			console.log(req.flash);

			// render the page and pass in any flash data if it exists
			res.render('signup', { message : req.flash('signupMessage') });

		}]
	},

	{
		path: '/signup',
		httpMethod: 'POST',
		authToUse : false,
		middleware: [AuthCtrl.register]
	},

// =====================================
// HOME SECTION =====================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)

	// middleware for all requests
	{
		path: '/home/*',
		httpMethod: 'SYS:USEALL',
		authToUse : 'isLoggedIn',
		middleware: [function (req, res) {

			var role;

			return next();

		}]
	},

	{
		path: '/home',
		httpMethod: 'GET',
		authToUse : 'isLoggedIn',
		middleware: [function (req, res) {

			var icSessionId = req.user._id;

			var user = req.user;

			res.render('index.ejs', {
				user : user
			});

		}]
	},

// =====================================
// LOGOUT ==============================
// =====================================
	{
		path: '/logout',
		httpMethod: 'GET',
		authToUse : false,
		middleware: [AuthCtrl.logout]
	}

];

module.exports = Routes;