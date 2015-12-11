var fs = require('fs');

var filename = process.argv.pop();
var dest_filename = getDestFilename(filename);

var html = fs.readFileSync(filename, 'utf8');

// replace Google Doc's 8 &nbsp; indentation
html = html.replace(/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/g, '');

fs.writeFileSync(dest_filename, html);

function getDestFilename(filename) {
  var filename_parts = filename.split('.');
  var ext = filename_parts.pop();
  if (ext != 'html' && ext != 'htm')
    throw new Error('Invalid filename: "' + filename + '", please provide filename ending in .html or .htm as the last argument');
  
  filename_parts.push('formatted');
  filename_parts.push('html');
  return filename_parts.join('.');
}
