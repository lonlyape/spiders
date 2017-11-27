const path = require('path');


const utils = {
	resolve: function(dir) {
		return path.join(__dirname, '../', dir)
	},
}

module.exports = utils;