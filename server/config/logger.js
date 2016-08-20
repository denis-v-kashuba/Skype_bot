/**
 * Created by deniskashuba on 17.08.15.
 */

var logger             				= require('intel');

var Logger = function() {

	var self = this;

	if ( arguments.callee._singletonInstance )
		return arguments.callee._singletonInstance;
	arguments.callee._singletonInstance = this;

	this.setLevel = function() {

		logger.setLevel(logger.WARN);

	}

	this.log = function(message) {

		logger.info(message);

	}

	this.logIntel = function(message, type) {

		if (type != undefined) {

			if (Array.isArray(message)) {

				for (var index in message) {

					var messageNew = message[index];

					logger[type](messageNew);

				}

			}else if (type === 'error') {
				logger[type](JSON.stringify(message));
			}else
				logger[type](message);

		}else {

			logger.info(message);

		}

	}

};

module.exports = Logger;