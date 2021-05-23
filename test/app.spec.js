const supertest = require('supertest');
const app = require('../app');

const email = `test+${Date.now()}@gmail.com`;
let userId = '';
let cardId = '';
const agent = supertest.agent(app);

describe('POST /signup', () => {
  it('SignUp returns a 200', (done) => {
    agent
      .post('/signup')
      .send({ email, password: '12345678' })
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
});

describe('POST /signin', () => {
  it('SignIn returns a 200 and a valid id', (done) => {
    agent
      .post('/signin')
      .send({ email, password: '12345678' })
      .expect((res) => {
        res.body._id === /^[a-f\d]{24}$/i;
      })
      .expect(200)
      .end((err, res) => {
        userId = res.body._id;
        if (err) done(err);
        done();
      });
  });
});

describe('POST /signin', () => {
  it('SignIn with invalid credentials returns a 401', (done) => {
    agent
      .post('/signin')
      .send({ email, password: '87654321' })
      .expect(401)
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
});

describe('GET /cards', () => {
  it('Get cards returns a 200', (done) => {
    agent
      .get('/cards')
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
});

describe('POST /cards', () => {
  it('Posting card returns a 200', (done) => {
    agent
      .post('/cards')
      .send({ name: 'some test card', link: 'https://1.bp.blogspot.com/-FEwLMm70Nqk/U-8nOJYiozI/AAAAAAAANT0/Evy905VXDbw/s1600/esc_dwb_stone_outside_patio_7486_560w.jpg' })
      .expect(200)
      .end((err, res) => {
        cardId = res.body._id;
        if (err) done(err);
        done();
      });
  });
});

describe('POST /cards', () => {
  it('Posting card with invalid link returns a 500', (done) => {
    agent
      .post('/cards')
      .send({ name: 'some test card', link: 'h://1.bp.blogspot.com/-FEwLMm70Nqk/U-8nOJYiozI/AAAAAAAANT0/Evy905VXDbw/s1600/esc_dwb_stone_outside_patio_7486_560w.jpg' })
      .expect(400)
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
});

describe('PUT /cards/cardId/likes', () => {
  it('Liking card returns 200', (done) => {
    agent
      .delete(`/cards/${cardId}/likes`)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
});

describe('DELETE /cards/cardId/likes', () => {
  it('Unliking card returns 200', (done) => {
    agent
      .delete(`/cards/${cardId}/likes`)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
});

describe('DELETE /cards/cardId', () => {
  it('Deleting card returns 200', (done) => {
    agent
      .delete(`/cards/${cardId}`)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
});

describe('GET /users/userId', () => {
  it('Getting a user returns 200', (done) => {
    agent
      .get(`/users/${userId}`)
      .expect((res) => {
        res.body._id === userId;
      })
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
});

describe('GET /users/me', () => {
  it('Getting my user returns 200', (done) => {
    agent
      .get('/users/me')
      .expect((res) => {
        res.body._id === userId;
      })
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
});

describe('PATCH /users/me/avatar', () => {
  it('Patching my user avatar returns 200', (done) => {
    agent
      .patch('/users/me/avatar')
      .send({ avatar: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.pg' })
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
});

describe('PATCH /users/me', () => {
  it('Patching my user returns 200', (done) => {
    agent
      .patch('/users/me')
      .send({ name: 'hans meiser', about: 'this is a test' })
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
});
