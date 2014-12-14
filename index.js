var iconv = require('iconv-lite');
var program = require('commander');
var request = require('request');
var cheerio = require('cheerio');

program
  .version('0.1.0')
  .option('-u, --url <url>', 'URL to scrape')
  .parse(process.argv);

var url = program.url;
request.get({
  url: url,
  encoding: null,
  headers: {
    'User-Agent': 'curl/0.76.0'
  }
}, function(err, res, body) {
  handleDeck(body);
});

function handleDeck(body) {
  body = iconv.decode(new Buffer(body), "ISO-8859-1");
  var ret = '<ul>';
  var $ = cheerio.load(body);
  $('div.card').each(function() {
    var $this = $(this);
    var front = $this.find('.front').text().trim();
    var back = $this.find('.back').text().trim();
    ret += '<li>' + front + '<ul><li>' + back + '</li></ul></li>';
  });
  ret += '</ul>';
  console.log(ret);
}
