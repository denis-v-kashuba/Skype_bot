/**
 * Created by deniskashuba on 20.08.16.
 */

//var restify = require('restify');
//var builder = require('botbuilder');
//
////=========================================================
//// Bot Setup
////=========================================================
//
//// Setup Restify Server
//var server = restify.createServer();
//server.listen(process.env.port || process.env.PORT || 3978, function () {
//	console.log('%s listening to %s', server.name, server.url);
//});
//
//// Create chat bot
//var connector = new builder.ChatConnector({
//	appId: process.env.MICROSOFT_APP_ID,
//	appPassword: process.env.MICROSOFT_APP_PASSWORD
//});
//var bot = new builder.UniversalBot(connector);
//server.post('/api/messages', connector.listen());
//
////=========================================================
//// Bots Dialogs
////=========================================================
//
//bot.dialog('/', function (session) {
//	session.send("Hello World");
//});

var restify = require('restify');
var builder = require('botbuilder');
var express = require('express');
var app = express();

//=========================================================
// Bot Setup
//=========================================================

//app.get('/', function(req, res){
//	res.send('Hello');
//});

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
	console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
	appId: "d270c2be-1f08-48d6-b883-48440f6ecec2",
	appPassword: "qCzUFFSNZ3rN8LDQ8hhg6Wp"
});
//var connector = new builder.ChatConnector({
//	appId: "",
//	appPassword: ""
//});

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
	// User is typing
});

bot.on('deleteUserData', function (message) {
	// User asked to delete their data
});

//=========================================================
// Bots Dialogs
//=========================================================
String.prototype.contains = function(content){
	return this.indexOf(content) !== -1;
}

bot.dialog('/', function (session) {

	if(session.message.text.toLowerCase().contains('hello')){
		session.send('Hey, How are you?');
	}else if(session.message.text.toLowerCase().contains('help')){
		session.send('How can I help you?');
	}else if(session.message.text.toLowerCase().contains('bogdan')){
		session.send('Работай лучше!');
	}else{
		session.send('Sorry I don\'t understand you...');
	}

});