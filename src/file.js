const utils = require('./utils.js');
const config = require('./config.js');
const cheerio = require('cheerio');
const fs = require('fs');

var file = {}

file.writeFile = function(p, callback) {
	var url = utils.resolve(config.folder + config.name + '.txt');
	if (fs.existsSync(url)) {
		fs.appendFileSync(url, '\r\n' + p + '\r\n');
		callback && callback();
	} else {
		fs.writeFileSync(url, '\r\n' + p + '\r\n');
		callback && callback();
	}
}

module.exports = file;