/**
 * Created by deniskashuba on 17.08.15.
 */

/*

 usage:
 var util                	= ServiceLocatorObj.get('util');

 if we need to initiate object:
 var LoggerObj 				= ServiceLocatorObj.get('/server/config/logger', true);

 */

var path 	= require('path');
var appDir 	= path.dirname(require.main.filename);

var factories = {};

function ServiceLocator() {

	var rootDirectory = appDir;
	var dependencies = {};
	var serviceLocator = {};

	serviceLocator.factory = function (name, factory) {
		factories[name] = factory;
	};

	serviceLocator.register = function (name, instance) {
		dependencies[name] = instance;
	};

	serviceLocator.get = function (name, object, argument) {

		//
		// if we don't have existing dependency
		//
		if (!dependencies[name]) {

			var factory = factories[name];

			//
			// creates factory for dependency
			//
			if (factory === undefined) {

				var factory = factories['default'];

				dependencies[name] = factory && factory(name, rootDirectory, object, argument);

			}
			else
				dependencies[name] = factory && factory(serviceLocator);

			if (!dependencies[name]) {
				throw new Error('Cannot find module: ' + name);
			}

		}

		return dependencies[name];

	};

	return serviceLocator;

};


var ServiceLocatorObj = new ServiceLocator();

//
// define default factory
//
ServiceLocatorObj.factory('default', function(moduleName, rootDirectory, object, argument) {

	if (moduleName.charAt(0) === '.' || moduleName.charAt(0) == '/') {

		if (moduleName.charAt(0) === '.')
			moduleName = moduleName.substring(1);

		if (object === true) {

			var tmp = require(rootDirectory + moduleName);

			if (argument != undefined)
				return new tmp(argument);
			else
				return new tmp();

		}
		else
			return require(rootDirectory + moduleName);

	}else {

		return require(moduleName);

	}

});

module.exports = ServiceLocatorObj;
