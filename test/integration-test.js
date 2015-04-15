var app = require('../app'),
    pkg = require('../package.json'),
    assert = require('assert'),
    api = require('hippie'),
    port = process.env.PORT || 3000;
    baseUrl = 'http://localhost:' + port;

describe('/ route integration tests', function() {
  before(function (done) {
    app.set('port', port);
    var server = app.listen(app.get('port'), function () {
      console.log('test server started on port %s', server.address().port);
      app.set('server', server);
      done();
    });
  });

  after(function (done) {
    var server = app.get('server');
    server.close(function (err) {
      console.log('test server stopped');
      done(err);
    });
  });

  it('should GET /', function (done) {
    api()
        .json()
        .base(baseUrl)
        .get('/')
        .expectStatus(200)
        .expectHeader('Content-Type', 'application/json; charset=utf-8')
        .expectBody({ service: pkg.name, version: pkg.version })
        .end(function(err, res, body) {
          done(err);
        });
  });
});

describe('/greeting route integration tests', function() {
  before(function (done) {
    app.set('port', port);
    var server = app.listen(app.get('port'), function () {
      console.log('test server started on port %s', server.address().port);
      app.set('server', server);
      done();
    });
  });

  after(function (done) {
    var server = app.get('server');
    server.close(function (err) {
      console.log('test server stopped');
      done(err);
    });
  });

  it('should GET /greeting', function (done) {
    api()
        .json()
        .base(baseUrl)
        .get('/greeting')
        .expectStatus(200)
        .expectHeader('Content-Type', 'application/json; charset=utf-8')
        .expectBody({success: true, greeting: 'Hello World'})
        .end(function (err, res, body) {
          done(err);
        });
  });

  it('should GET /greeting/:name', function (done) {
    api()
        .json()
        .base(baseUrl)
        .get('/greeting/nodester')
        .expectStatus(200)
        .expectHeader('Content-Type', 'application/json; charset=utf-8')
        .expectBody({success: true, greeting: 'Hello nodester'})
        .end(function (err, res, body) {
          done(err);
        });
  });

  it('should POST a custom message to /greeting/:name', function (done) {
    api()
        .json()
        .base(baseUrl)
        .post('/greeting/nodester')
        .send({message: 'test message'})
        .expectStatus(200)
        .expectHeader('Content-Type', 'application/json; charset=utf-8')
        .expectBody({ success: true, greeting: 'Hello nodester', message: 'test message' })
        .end(function (err, res, body) {
          done(err);
        });
  });

});

describe('/greeting route custom salutation unit tests', function() {

  it('should POST a custom salutation to /greeting', function (done) {
    api()
        .json()
        .base(baseUrl)
        .post('/greeting')
        .send({ salutation: 'Hola' })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, { success: true, salutation: 'Hola' }, done);
  });

  it('should GET /greeting with custom salutation', function (done) {
    api()
        .json()
        .base(baseUrl)
        .get('/greeting')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, {success: true, greeting: 'Hola World'}, done);
  });

  it('should GET /greeting/:name with custom salutation', function (done) {
    api()
        .json()
        .base(baseUrl)
        .get('/greeting/mundo')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, {success: true, greeting: 'Hola mundo'}, done);
  });

});
