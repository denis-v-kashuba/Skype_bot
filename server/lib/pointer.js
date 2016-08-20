/**
 * Created by deniskashuba on 21.08.16.
 */
var ServiceLocatorObj = require('./serviceLocator');

var mongooseNative = ServiceLocatorObj.get('mongoose');

var _ = ServiceLocatorObj.get('lodash');
var moment = ServiceLocatorObj.get('moment');
var async = ServiceLocatorObj.get('async');
var config = ServiceLocatorObj.get('/server/config/config');

var PointerModel = ServiceLocatorObj.get('/server/models/Pointer.js');

var ObjectIdDataType = mongooseNative.Types.ObjectId;

var Pointer = function () {

	var self = this;

	var stopMarker = '+=-';

	/**
	 * функция обрабатывающая GET запрос,с переданным id и без
	 * @param req
	 * @param res
	 * @param next
	 */
	this.process = function (session) {

		//console.log(session);

		var message = session.message.text.toLowerCase();

		if(typeof message !== 'undefined' && message.contains('+=-')) {

				var splittedStringArray = message.split('/');

				if (splittedStringArray && splittedStringArray.length && splittedStringArray.indexOf(stopMarker) > -1) {

					var markerNum = splittedStringArray.indexOf(stopMarker);

					var citrus = splittedStringArray.slice(markerNum+1, (splittedStringArray.length - markerNum));

					//console.log(splittedStringArray.length);
					//console.log(markerNum);
					//console.log(citrus);

					var saveObj = {};
					saveObj['themes'] = {};
					saveObj['themes'][citrus[0]] = {};
					saveObj['themes'][citrus[0]][citrus[1]] = citrus[2];


					save(saveObj, function(data) {

						console.log(data);

					});


				}

		}

	};

	/**
	 * функция обрабатывающая GET запрос,с переданным id и без
	 * @param req
	 * @param res
	 * @param next
	 */
	function list(cb) {

		var find = {};

		PointerModel.find(find, function (err, data) {
			cb(data);
		});

	};

	/**
	 * функция обрабатывающая POST запрос
	 * @param req
	 * @param res
	 * @param next
	 */
	function save(sData, cb) {

		var dataAnswer = {
			result: '',
			data: {}
		};

		if (sData) {

			var datatosave = new PointerModel(sData);

			datatosave.save(function (err, data) {

				if (err) {

					dataAnswer.data.errors = "error here " + err;

				}else
					dataAnswer.data = data;

				return cb(dataAnswer);

			});

		} else {

			dataAnswer.data.errors = "content is not defined";

			return cb(dataAnswer);

		}

	};

	//*
	// * функция обрабатывающая PUT запрос
	// * @param req
	// * @param res
	// * @param next
	//update: function (req, res, next) {
	//
	//	var dataAnswer = {
	//		result: '',
	//		data: {}
	//	};
	//
	//	if (req && req.body && req.body._id) {
	//
	//		var query = {_id: req.body._id};
	//		delete req.body._id;
	//		PointerModel.update(query, req.body, function (err, quizs) {
	//
	//			console.log(err);
	//			console.log(quizs);
	//			return res.json(quizs);
	//
	//		});
	//
	//	}else {
	//
	//		dataAnswer.data.errors = "content is not defined";
	//
	//		return res.json(dataAnswer);
	//
	//	}
	//
	//}

};

module.exports = Pointer;