'use strict';


var ServiceLocatorObj = require('./server/lib/serviceLocator');

/**
 *
 * Package initiation
 *
 */

var mongoose = ServiceLocatorObj.get('/server/lib/mongoose.js');

var express					= ServiceLocatorObj.get('express');
var logfmt					= ServiceLocatorObj.get('logfmt');
var cookieParser			= ServiceLocatorObj.get('cookie-parser');
var bodyParser				= ServiceLocatorObj.get('body-parser');
var methodOverride 			= ServiceLocatorObj.get('method-override');
var session					= ServiceLocatorObj.get('express-session');
var passport				= ServiceLocatorObj.get('passport');
var flash 	 				= ServiceLocatorObj.get('connect-flash');
var MongoStore 				= ServiceLocatorObj.get('connect-mongo')(session);

var config		        	= ServiceLocatorObj.get('/server/config/config');
var LoggerObj		        = ServiceLocatorObj.get('/server/config/logger', true);

var mongoose				= ServiceLocatorObj.get('/server/lib/mongoose');

/**
 *
 * Package initiation
 *
 */


/**
 *
 * Initiation
 *
 */

var app = express();

/*

 config part

 */
var cacheMS = 4200000;  //age for static files
/*

 config part

 */


//
// sample of logger
//
LoggerObj.logIntel('!!! This process is pid !!! - ' + process.pid);


// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 *
 * Initiation
 *
 */

/**
 *
 * App use
 *
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());
app.use(cookieParser('secret cookie string'));
app.use(methodOverride('X-HTTP-Method-Override'));

// required for passport
app.use(session({
	secret: config.get('secret'),
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
	cookie: { maxAge: 315360000000 },
	resave: true,
	saveUninitialized: true
})); // session secret

app.use(flash()); // use connect-flash for flash messages stored in session

require('./server/config/passport')(passport, config); // pass passport for configuration

app.use(passport.initialize());
app.use(passport.session());

LoggerObj.logIntel(config.get('views_path'));

app.set('port', process.env.PORT || config.get('port'));
app.set('views', __dirname + config.get('views_path'));
app.set('view engine', 'ejs'); // set up ejs for templating

app.use(express.static("" + __dirname + "/public_js", {maxAge:cacheMS}));

// Session-persisted message middleware
app.use(function(req, res, next){
	var err = req.session.error,
		msg = req.session.notice,
		success = req.session.success;

	delete req.session.error;
	delete req.session.success;
	delete req.session.notice;

	if (err) res.locals.error = err;
	if (msg) res.locals.notice = msg;
	if (success) res.locals.success = success;

	next();
});

/**
 *
 * App use
 *
 */


/**
 *
 * Router
 *
 */

var router = express.Router();
var routes = require('./server/routes')(router);
app.use('/', router);

app.use(express.static(__dirname + '/app'));
app.use('/app', express.static(__dirname + '/app'));
app.use('/server', express.static(__dirname + '/app'));

/**
 *
 * Router
 *
 */


/**
 *
 * Server
 *
 */

app.listen(app.get('port'), function () {
	LoggerObj.logIntel(config.get('application:name') + " server listening on port " + app.get('port'), 'info');
});

/**
 *
 * Server
 *
 */


var BotInitiation = ServiceLocatorObj.get('/server/lib/botInitiation.js');