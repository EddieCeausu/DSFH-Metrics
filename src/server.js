var http = require('http');
var charts = require('./chartData');
const exported = async function() { return await charts.exportVars() };
var fin;

exported().then((result) => {
  fin = result
  console.log(JSON.stringify(fin));
});

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  // res.write("hello world\n\n");
  var json = JSON.stringify(fin);
  res.end(json);
}).listen(8080);