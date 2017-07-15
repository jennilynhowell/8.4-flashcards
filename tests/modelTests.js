const expect = require('chai').expect;
const User = require('../models/user');
const Card = require('../models/card');
const request = require('supertest');
const app = require('../app');
const createPasswordObject = require('../controllers/helpers').createPasswordObject;


//card model
describe('card model endpoint tests', () => {

  beforeEach((done) => {
    let myCard = new Card({userId: "54cd6669d3e0fb1b302e55e6", question: 'Best frozen treat?', answer: 'custard', category: 'Treats'});
    let myCard2 = new Card({userId: "54cd6669d3e0fb1b302e55f7", question: 'Best doughnut shop?', answer: 'Glazed Charleston', category: 'Treats'});
    let myCard3 = new Card({userId: "54cd6669d3e0fb1b302e55g8", question: 'T/F: Programming is fun', answer: 'TRUE!', category: 'Programming'});
    Card.insertMany([myCard, myCard2, myCard3]).then(() => {done()});
  });

  afterEach((done) => {
    Card.deleteMany({}).then(() => {done()});
  });

  it('can GET one card at /card/:id', (done) => {
    let myCard = new Card({userId: "54cd6669d3e0fb1b302e54e6", question: 'Cutest puppy?', answer: 'Luke', category: 'Dogs'}).save().then(card => {
      request(app)
        .get('/card/' + card._id)
        .expect(200)
        .expect(res => {
          expect(res.body.data.answer).to.equal('Luke');
        }).end(done);
      });
  });

  //can't get card data to pass through promise??
  it('can PATCH a card at /card/:id', (done) => {
    let myCard = new Card({userId: "54cd6669d3e0fb1b302e54e6", question: 'Cutest puppy?', answer: 'Luke', category: 'Dogs'}).save().then(card => {
      request(app)
        .patch('/card/' + card._id)
        .send({question: 'Best puppy?'})
        .expect(200)
        .expect(res => {
          console.log(res.body);
          expect(res.body.message).to.equal('Success');
        }).end(done);
      });
  });

  it('can GET all cards by category at /card/category', (done) => {
    request(app)
      .get('/card/category')
      .send({category: 'Treats'})
      .expect(200)
      .expect(res => {
        expect(res.body.data[0].category).to.equal('Treats');
        expect(res.body.data[1].question).to.equal('Best doughnut shop?');
      }).end(done);
  });

  it('can GET all cards at /card', (done) => {
    request(app)
      .get('/card')
      .expect(200)
      .expect(res => {
        expect(res.body.data[2].answer).to.equal('TRUE!');
        expect(res.body.data[0].category).to.equal('Treats');
      }).end(done);
  });

  it('can DELETE a card at /card/:id/delete', (done) => {
    let myCard = new Card({userId: "54cd6669d3e0fb1b302e54e6", question: 'Cutest puppy?', answer: 'Luke', category: 'Dogs'}).save().then(card => {
      request(app)
        .delete('/card/' + card._id + '/delete')
        .expect(200)
        .expect(res => {
          expect(res.body.message).to.equal('Success');
        }).end(done);
    });

  });

  it('can create card at POST /card', (done) => {
    request(app)
      .post('/card')
      .send({userId: "54cd6669d3e0fb1b302e54e6", question: 'Cutest puppy?', answer: 'Luke', category: 'Dogs'})
      .expect(res => {
        expect(201);
        expect(res.body.message).to.equal('Success');
        expect(res.body.data.answer).to.equal('Luke');
      }).end(done);
    });

});



//user model
describe('user model endpoint tests', () => {
  beforeEach((done) => {
    User.deleteMany({}).then(() => {done()});
  });

  afterEach((done) => {
    User.deleteMany({}).then(() => {done()});
  });

  it('will confirm valid user + pw at POST /user/login', (done) => {
    let username = 'bunnies'
      , password = 'cute'
      , hashPassword = createPasswordObject('cute');

    let newUser = new User({username: username, password: hashPassword}).save().then(user => {
      request(app)
        .post('/user/login')
        .send({username: username, password: password})
        .expect(200)
        .expect(res => {
          expect(res.body.data.username).to.equal('bunnies');
        }).end(done);
    });
  });


  it('can create password object from string', (done) => {
    let pwObject = createPasswordObject('password', 'a');
    let expectedPwObject = {iterations: 100, salt: 'a', hash: 'pXN2J2eBnwuoYVeJYCTw0PYUnG8qxBl48AnMa94Q8tPxVnH9adPS/Upk314EdPVLk9NGEsET5/5eO0L8KEAIZAZblXsjN/nY0lGeu6dQlu+qagQLtk3jTChiYLQ32w+bPoXEQeMAreJLtqNNLeaT2SY7y4Q8/uU1JGdcDKpXWrR/ZQ8iKEpJ0DKY8BKZEoWk1vYGbLQt6miO8y+zRSzQyN1YRZNkw4XF0AA7stxaRYD/MlL7bcP8rYYHGxVM5dQpsFK3amD4ObCkixeFe982W6JQYD22PpQ3dt2QAzovMFAVgCyxYfMg4FK+cHcSBIzoriIsMUCjO0I2NPyOUesOog=='};
    expect(pwObject).to.not.equal(null);
    expect(pwObject).to.deep.equal(expectedPwObject);
    done();
  });

  it('can POST a new user with pw object at /user', (done) => {
    request(app)
      .post('/user')
      .send({username: 'luke', password: 'puppy', passwordConf: 'puppy'})
      .expect(200)
      .expect(res => {
        expect(res.body.data.username).to.equal('luke');
        expect(res.body.data.password.hash.length).to.equal(344);
      }).end(done);

  });

});


//sanity testing
describe('sanity testing: models', () => {
  it('sanity test', (done) => {
    expect(4).to.not.equal(5);
    done();
  });
});
