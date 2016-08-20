/**
 * Created by deniskashuba on 17.08.15.
 */

var nconf = require('nconf');

nconf.argv()
	.env()
	.file({ file: './config.json' });

module.exports = nconf;