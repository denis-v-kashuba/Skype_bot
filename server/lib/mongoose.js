/**
 * Created by deniskashuba on 18.08.15.
 */

var ServiceLocatorObj		= require('./serviceLocator');

var mongoose				= ServiceLocatorObj.get('mongoose');
var config		        	= ServiceLocatorObj.get('/server/config/config');
var LoggerObj		        = ServiceLocatorObj.get('/server/config/logger', true);

var mongoUri = process.env.MONGOLAB_URI || config.get('mongoose:uri');

mongoose.connect(mongoUri);

var db = mongoose.connection;

db.on('error', function (err) {

	LoggerObj.logIntel(["MongoDB connection error", err.message], 'error');

});

db.once('open', function callback () {

	LoggerObj.logIntel("Connected to MongoDB!", 'info');

});

// -----------------------------------------------

var Schema = mongoose.Schema;


// Client
//
// !!! Sample of schema
//
// define the schema for our user model
//var Client = new Schema({
//
//	number     			: { type: String, required: true },
//	name 				: { type: String, required: false },
//	discount			: { type: Number, required: false },
//	discountType		: { type: Number, required: false },
//	promotionalRide		: { type: Number, required: false },
//	comments			: [
//		{
//			comment		: String,
//			userId		: String,
//			username	: String,
//			cdate		: Date
//		}
//	],
//	cdate		 		: Date,
//	udate		 		: Date
//
//});
//
//var clientModel = mongoose.model('Client', Client);

//
// !!! sample of export
//
//module.exports.clientModel 			= clientModel;
module.exports.mongoose 			     = mongoose;
module.exports.connection 			     = mongoose.connection;
