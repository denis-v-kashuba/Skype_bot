// load all the things we need
var ServiceLocatorObj = require('../lib/serviceLocator');

var LocalStrategy = ServiceLocatorObj.get('passport-local').Strategy;
var async = ServiceLocatorObj.get('async');

var User = ServiceLocatorObj.get('/server/models/User');

// expose this function to our app using module.exports
module.exports = function(passport, config) {

	// =========================================================================
	// passport session setup ==================================================
	// =========================================================================
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session

	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	function utf8_to_b64(str) {
		return new Buffer(encodeURIComponent(str)).toString('base64')
	}

	function transliterate(word){
		var answer = ""
			, a = {};

		a["Ё"]="YO";a["Й"]="I";a["Ц"]="TS";a["У"]="U";a["К"]="K";a["Е"]="E";a["Н"]="N";a["Г"]="G";a["Ш"]="SH";a["Щ"]="SCH";a["З"]="Z";a["Х"]="H";a["Ъ"]="_";
		a["ё"]="yo";a["й"]="i";a["ц"]="ts";a["у"]="u";a["к"]="k";a["е"]="e";a["н"]="n";a["г"]="g";a["ш"]="sh";a["щ"]="sch";a["з"]="z";a["х"]="h";a["ъ"]="_";
		a["Ф"]="F";a["Ы"]="I";a["В"]="V";a["А"]="a";a["П"]="P";a["Р"]="R";a["О"]="O";a["Л"]="L";a["Д"]="D";a["Ж"]="ZH";a["Э"]="E";
		a["ф"]="f";a["ы"]="i";a["в"]="v";a["а"]="a";a["п"]="p";a["р"]="r";a["о"]="o";a["л"]="l";a["д"]="d";a["ж"]="zh";a["э"]="e";
		a["Я"]="Ya";a["Ч"]="CH";a["С"]="S";a["М"]="M";a["И"]="I";a["Т"]="T";a["Ь"]="_";a["Б"]="B";a["Ю"]="YU";
		a["я"]="ya";a["ч"]="ch";a["с"]="s";a["м"]="m";a["и"]="i";a["т"]="t";a["ь"]="_";a["б"]="b";a["ю"]="yu";

		for (i in word){
			if (word.hasOwnProperty(i)) {
				if (a[word[i]] === undefined){
					answer += word[i];
				} else {
					answer += a[word[i]];
				}
			}
		}
		return answer;
	}

	// =========================================================================
	// LOCAL SIGNUP ============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'
	passport.use('local-signup', new LocalStrategy({
			// by default, local strategy uses username and password, we will override with email
			usernameField : 'username',
			passwordField : 'password',
			passReqToCallback : true // allows us to pass back the entire request to the callback
		},
		function(req, username, password, done) {

			// asynchronous
			// User.findOne wont fire unless data is sent back
			process.nextTick(function() {

				// find a user whose email is the same as the forms email
				// we are checking to see if the user trying to login already exists
				User.findOne({ 'username' :  username }, function(err, user) {
					// if there are any errors, return the error
					if (err)
						return done(err);

					//console.log(user);

					// check to see if theres already a user with that email
					if (user) {
						return done(null, false, req.flash('signupMessage', 'Этот логин занят'));
					} else {

						// if there is no user with that email
						// create the user
						var newUser = new User();

						// set the user's local credentials
						newUser.username 				= username;
						newUser.password 				= newUser.generateHash(password);

						// save the user
						newUser.save(function(err) {

							if (err)
								throw err;

							return done(null, newUser);
						});

					}

				});

			});

		}));

	// =========================================================================
	// LOCAL LOGIN =============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'
	passport.use('local-login', new LocalStrategy({
			// by default, local strategy uses username and password, we will override with email
			usernameField : 'username',
			passwordField : 'password',
			passReqToCallback : true, // allows us to pass back the entire request to the callback
			failureFlash: true
		},
		function(req, username, password, done) { // callback with email and password from our form

			// find a user whose email is the same as the forms email
			// we are checking to see if the user trying to login already exists
			User.findOne({ 'username' :  username }, function(err, user) {

				// if there are any errors, return the error before anything else
				if (err)
					return done(err);

				// if no user is found, return the message
				if (!user)
					return done(null, false, req.flash('loginMessage', 'Такого пользователя не существует')); // req.flash is the way to set flashdata using connect-flash

				// if the user is found but the password is wrong
				if (!user.validPassword(password))
					return done(null, false, req.flash('loginMessage', 'Не верный пароль')); // create the loginMessage and save it to session as flashdata

				// all is well, return successful user
				return done(null, user);

			});

		}));


};