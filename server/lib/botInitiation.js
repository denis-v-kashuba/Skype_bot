/**
 * Created by deniskashuba on 20.08.16.
 */
'use strict';

var ServiceLocatorObj = require('./serviceLocator');

//var LoggerObj = ServiceLocatorObj.get('/server/config/logger', true);
var config = ServiceLocatorObj.get('/server/config/config');

//var mongoose = ServiceLocatorObj.get('/server/lib/mongoose.js');

var restify	= ServiceLocatorObj.get('restify');
var builder	= ServiceLocatorObj.get('botbuilder');

//var Pointer = ServiceLocatorObj.get('/server/lib/pointer.js', true);
//
//LoggerObj.logIntel('_!_!_!_!_!_ Started log initiation !!!', 'info');


//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || config.get('bot_port'), function () {
	console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
	appId: config.get('azure:appId'),
	appPassword: config.get('azure:appPassword')
});

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());
server.get('/api/messages', connector.listen());

//Bot on
bot.on('contactRelationUpdate', function (message) {
	if (message.action === 'add') {
		var name = message.user ? message.user.name : null;
		var reply = new builder.Message()
			.address(message.address)
			.text("Hello %s... Thanks for adding me. Say 'hello' to see some great demos.", name || 'there');
		bot.send(reply);
	} else {
		// delete their data
	}
});

bot.on('typing', function (message) {

	//LoggerObj.logIntel('_!_!_!_!_!_ User is typing !!!', 'info');

	// User is typing
});

bot.on('deleteUserData', function (message) {

	//LoggerObj.logIntel('_!_!_!_!_!_ deleteUserData !!!', 'info');

	// User asked to delete their data
});

//=========================================================
// Bots Dialogs
//=========================================================
String.prototype.contains = function(content){
	return this.indexOf(content) !== -1;
}

//console.log(bot);

bot.dialog('/', function (session) {

	//Pointer.process(session);

	if(session.message.text.toLowerCase().contains('hello')){
		session.send('Hey, How are you?');
	}else if(session.message.text.toLowerCase().contains('help')){
		session.send('How can I help you?');
	}else if(session.message.text.toLowerCase().contains('bogdan')) {
		session.send('Работай лучше!');
	}else if(session.message.text.toLowerCase().contains('ebsh')){
		session.send('Богдан ебашь работу!');
	}else if(session.message.text.toLowerCase().contains('sigma')){
		session.send('Best team in the world!');
	}else if(session.message.text.toLowerCase().contains('Dan')){
		session.send('Hi Dan! How are you?');
	}else{
		session.send('Sorry I don\'t understand you...');
	}

});