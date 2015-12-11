var fs = require('fs');
var cheerio = require('cheerio');

var filename = process.argv.pop();
var dest_filename = getDestFilename(filename);

var html = fs.readFileSync(filename, 'utf8');

// replace Google Doc's 8 &nbsp; indentation
html = html.replace(/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/g, '');

// add decent paragraph style
$ = cheerio.load(html);
var style = $('style').html();
console.log(style);
style = style.replace(/\{[^\}]+\}/g, '{ }');
style += '\np { text-indent: 2em; margin: 0; }\n';
$('style').html(style);

// output the book
fs.writeFileSync(dest_filename, $.html());

console.log('Book formatted and output to: ' + dest_filename);

function getDestFilename(filename) {
  var filename_parts = filename.split('.');
  var ext = filename_parts.pop();
  if (ext != 'html' && ext != 'htm')
    throw new Error('Invalid filename: "' + filename + '", please provide filename ending in .html or .htm as the last argument');
  
  filename_parts.push('formatted');
  filename_parts.push('html');
  return filename_parts.join('.');
}
