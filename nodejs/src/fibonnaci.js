const http = require('http');
const url = require('url');

function fibonacci(n, callback) {
  
    var inner = function(n1, n2, i) {
        if (i > n) {
            callback(null, n2);
            return;
        }
        var func = (i % 100) ? inner : inner_tick;
        func(n2, n1 + n2, i + 1);
    };
  
    var inner_tick = function(n1, n2, i) {
        process.nextTick(function() { inner(n1, n2, i); });
    };
  
    if (n == 1 || n == 2) {
        callback(null, 1);
    } else {
        inner(1, 1, 3);
    }
}

http.createServer(function(request, response) {
  var query;
  var result = 0;
  var parsedUrl = url.parse(request.url, parseQueryString=true);
  if (request.method === 'GET' && parsedUrl.pathname === '/fib') {
    query = parsedUrl.query;
    result = fibonacci(query.n, function(err, number) {
      response.write(''+number);
       response.end();      
    });
  } else {
    console.log(request.url);
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);
