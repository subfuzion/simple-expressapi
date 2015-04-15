var app = require('../app'),
    pkg = require('../package.json'),
    request = require('supertest');

describe('/ route unit tests', function() {

  it('should GET /', function (done) {
    request(app)
        .get('/')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, { service: pkg.name, version: pkg.version }, done);
  });

});


describe('/greeting route unit tests', function() {

  it('should GET /greeting', function (done) {
    request(app)
        .get('/greeting')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, {success: true, greeting: 'Hello World'}, done);
  });

  it('should GET /greeting/:name', function (done) {
    request(app)
        .get('/greeting/nodester')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, {success: true, greeting: 'Hello nodester'}, done);
  });

  it('should POST a custom message to /greeting/:name', function (done) {
    request(app)
        .post('/greeting/nodester')
        .send({message: 'test message'})
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, { success: true, greeting: 'Hello nodester', message: 'test message' }, done);
  });

});

describe('/greeting route custom salutation unit tests', function() {

  it('should POST a custom salutation to /greeting', function (done) {
    request(app)
        .post('/greeting')
        .send({ salutation: 'Hola' })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, { success: true, salutation: 'Hola' }, done);
  });

  it('should GET /greeting with custom salutation', function (done) {
    request(app)
        .get('/greeting')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, {success: true, greeting: 'Hola World'}, done);
  });

  it('should GET /greeting/:name with custom salutation', function (done) {
    request(app)
        .get('/greeting/mundo')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, {success: true, greeting: 'Hola mundo'}, done);
  });

});
