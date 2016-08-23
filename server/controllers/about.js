/**
 * Created by deniskashuba on 30.05.16.
 */

var ServiceLocatorObj = require('../lib/serviceLocator');

var mongooseNative = ServiceLocatorObj.get('mongoose');
var _ = ServiceLocatorObj.get('lodash');
var moment = ServiceLocatorObj.get('moment');
var async = ServiceLocatorObj.get('async');
var config = ServiceLocatorObj.get('/server/config/config');

var AboutModel = ServiceLocatorObj.get('/server/models/About.js');

var ObjectIdDataType = mongooseNative.Types.ObjectId;

module.exports = {

	/**
	 *
	 * @param req
	 * @param res
	 * @param next
	 */
	list: function (req, res, next) {

		var find = {};

		AboutModel.find(find, function (err, data) {
			res.json(data);
		});

	},

	/**
	 *
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*|Object}
	 */
	save : function(req, res, next) {

		var dataAnswer = {
			result: '',
			data: {}
		};

		if (req.body) {

			var datatosave = new AboutModel(req.body);

			datatosave.save(function (err, data) {

				if (err) {

					dataAnswer.data.errors = "error here " + err;

				}else
					dataAnswer.data = data;

				return res.json(dataAnswer);

			});

		} else {

			dataAnswer.data.errors = "content is not defined";

			return res.json(dataAnswer);

		}

	}


};