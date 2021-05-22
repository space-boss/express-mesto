const supertest = require('supertest');
const app = require('../app');
const email = 'test+' + Date.now() + '@gmail.com';
var userId = "";
var cardId = "";
var agent = supertest.agent(app);

describe('POST /signup', function() {
  it('SignUp returns a 200', function(done) {
    agent
      .post('/signup')
      .send({ 'email': email, 'password':'12345678' })
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});

describe('POST /signin', function() {
  it('SignIn returns a 200 and a valid id', function(done) {
    agent
      .post('/signin')
      .send({ 'email': email, 'password':'12345678' })
      .expect((res) => {
        res.body._id === /^[a-f\d]{24}$/i
      })
      .expect(200)
      .end(function(err, res){
        userId = res.body._id;
        if (err) done(err);
        done();
      });
  });
});

describe('POST /signin', function() {
  it('SignIn with invalid credentials returns a 401', function(done) {
    agent
      .post('/signin')
      .send({ 'email': email, 'password':'87654321' })
      .expect(401)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});

describe('GET /cards', function() {
  it('Get cards returns a 200', function(done) {
    agent
      .get('/cards')
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});

describe('POST /cards', function() {
  it('Posting card returns a 200', function(done) {
    agent
      .post('/cards')
      .send({ 'name': "some test card", 'link':'https://1.bp.blogspot.com/-FEwLMm70Nqk/U-8nOJYiozI/AAAAAAAANT0/Evy905VXDbw/s1600/esc_dwb_stone_outside_patio_7486_560w.jpg' })
      .expect(200)
      .end(function(err, res){
        cardId = res.body._id;
        if (err) done(err);
        done();
      });
  });
});

describe('POST /cards', function() {
  it('Posting card with invalid link returns a 500', function(done) {
    agent
      .post('/cards')
      .send({ 'name': "some test card", 'link':'h://1.bp.blogspot.com/-FEwLMm70Nqk/U-8nOJYiozI/AAAAAAAANT0/Evy905VXDbw/s1600/esc_dwb_stone_outside_patio_7486_560w.jpg' })
      .expect(400)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});

describe('PUT /cards/cardId/likes', function() {
  it('Liking card returns 200', function(done) {
    agent
      .delete('/cards/' + cardId + '/likes')
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});

describe('DELETE /cards/cardId/likes', function() {
  it('Unliking card returns 200', function(done) {
    agent
      .delete('/cards/' + cardId + '/likes')
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});

describe('DELETE /cards/cardId', function() {
  it('Deleting card returns 200', function(done) {
    agent
      .delete('/cards/' + cardId)
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});

describe('GET /users/userId', function() {
  it('Getting a user returns 200', function(done) {
    agent
      .get('/users/' + userId)
      .expect((res) => {
        res.body._id === userId
      })
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});

describe('GET /users/me', function() {
  it('Getting my user returns 200', function(done) {
    agent
      .get('/users/me')
      .expect((res) => {
        res.body._id === userId
      })
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});

describe('PATCH /users/me/avatar', function() {
  it('Patching my user avatar returns 200', function(done) {
    agent
      .patch('/users/me/avatar')
      .send({'avatar':'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.pg'})
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});

describe('PATCH /users/me', function() {
  it('Patching my user returns 200', function(done) {
    agent
      .patch('/users/me')
      .send({'name': 'hans meiser', 'about':'this is a test'})
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});
