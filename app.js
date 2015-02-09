var app = require('express')(),
    bodyParser = require('body-parser'),
    debug = require('debug')('app'),
    morgan = require('morgan'),
    path = require('path'),
    pkg = require('./package.json');

module.exports = app;

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
// for other body parsing middleware, see:
// http://expressjs.com/4x/api.html#req.body

// routes

app.get('/', function(req, res) {
  res.json({ service: pkg.name, version: pkg.version });
});

app.get('/greeting', function(req, res) {
  res.json({ greeting: 'Hello World!' });
});

app.get('/greeting/:name', function(req, res) {
  var name = req.params.name;
  res.json({ greeting: 'Hello ' + name + '!' });
});

app.post('/greeting/:name', function(req, res) {
  var name = req.params.name,
      body = req.body;

  res.json({ greeting: 'Hello ' + name + '!', message: body.message });
});


if (require.main === module) {
  app.set('port', process.env.PORT || 3000);
  var server = app.listen(app.get('port'), function() {
    // the callback is added as a listener for the server's 'listen' event
    // see: http://nodejs.org/api/net.html#net_server_listen_path_callback

    // server is an http.Server, which extends a net.Server
    // http://nodejs.org/api/http.html#http_class_http_server
    // http://nodejs.org/api/net.html#net_class_net_server
    // http://nodejs.org/api/net.html#net_server_address
    debug('server started on port %s', server.address().port);

    // provide access to server via exported app for querying and adding listeners
    app.set('server', server);
  });
}
