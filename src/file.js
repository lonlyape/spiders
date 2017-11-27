const utils = require('./utils.js');
const config = require('./config.js');
const cheerio = require('cheerio');
const fs = require('fs');

var file = {}

file.writeFile = function(p, callback) {
	var folder = utils.resolve(config.folder);
	fs.access(folder, fs.constants.R_OK | fs.constants.W_OK, function(e) {
		if (e) {
			fs.mkdir(folder, function() {
				file.write(p, callback);
			})
		} else {
			file.write(p, callback);
		}
	});
}
file.write = function(p, callback) {
	var url = utils.resolve(config.folder + '/' + config.name + '.txt');
	if (fs.existsSync(url)) {
		fs.appendFileSync(url, '\r\n' + p + '\r\n');
		callback && callback();
	} else {
		fs.writeFileSync(url, '\r\n' + p + '\r\n');
		callback && callback();
	}
}
module.exports = file;