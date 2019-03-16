const cheerio = require('cheerio');
const config = require('./config.js');
const file = require('./file.js');

function http() {
	var http;
	if (/^(https)/.test(config.href)) {
		http = require('https');
	} else {
		http = require('http');
	}
	return http;
}

function getHttp(filePath, callback) {
	http().get(config.href + filePath, function(res) {
		var html = '';
		res.setEncoding('utf-8');

		res.on('data', function(data) {
			html += data;
		});

		res.on('end', function() {
			var $ = cheerio.load(html); //采用cheerio模块解析html
			var font = $('#htmlContent').find('p');
			var j = -1;

			function fonts() {
				j++;
				if (j >= font.length) {
					callback();
					return;
				}
				file.writeFile($(font[j]).text(), fonts);
			}
			fonts();
		});

		res.on('error', function(err) {
			console.log(err);
		});
	})
}

function getUrl() {
	http().get(config.href + 'index.html', function(res) {
		var html = '';
		res.setEncoding('utf-8');

		res.on('data', function(data) {
			html += data;
		});

		res.on('end', function() {
			var $ = cheerio.load(html); //采用cheerio模块解析html
			var ul = $('.wrapper_list .booklist').find('ul');
			var a = $(ul).find('li>a');
			var i = 8;

			function wriert() {
				i++;
				console.log(i - 8);
				if (i >= a.length) {
					return;
				}
				file.writeFile($(a[i]).text().replace('正文', ''));
				getHttp($(a[i]).attr('href'), wriert);
			}
			wriert();
		});

		res.on('error', function(err) {
			console.log(err);
		});
	})
}

module.exports = getUrl;