/**
 * Created by deniskashuba on 30.05.16.
 */

var ServiceLocatorObj = require('../../lib/serviceLocator');

var AboutCtrl = ServiceLocatorObj.get('/server/controllers/about');

var Routes = [

	//
	// list of content
	//
	{
		path: '/about',
		httpMethod: 'GET',
		authToUse : false,
		middleware: [AboutCtrl.list]
	},

	//
	// save content
	//
	{
		path: '/about',
		httpMethod: 'POST',
		authToUse : 'isLoggedIn',
		middleware: [AboutCtrl.save]
	}

];

module.exports = Routes;