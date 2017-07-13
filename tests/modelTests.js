const expect = require('chai').expect;
const User = require('../models/user');
const Card = require('../models/card');
const request = require('supertest');
const app = require('../app');

//function requires from controllers
const createUser = require('../app').createUser;
const createPasswordObject = require('../app').createPasswordObject;
const login = require('../app').login;
const createCard = require('../controllers/card_controller').createCard;
const deleteCard = require('../app').deleteCard;

//card model
describe('card model tests', () => {
  // beforeEach((done) => {
  //   Card.insertMany([
  //     {userId: "54cd6669d3e0fb1b302e54e6", question: 'Cutest puppy?', answer: 'Luke', category: 'Dogs'},
  //
  //     {userId: "54cd6669d3e0fb1b302e54f7", question: 'Programming is _', answer: 'Fun', category: 'Programming'},
  //
  //     {userId: "54cd6669d3e0fb1b302e54g8", question: 'Best doughnuts?', answer: 'Glazed', category: 'Treats'}
  //   ]).then(done());
  // });
  beforeEach((done) => {
    Card.deleteMany({}).then(() => {done()});
  });

  afterEach((done) => {
    Card.deleteMany({}).then(() => {done()});
  });

  it('can DELETE a card at /api/card/:id/delete', (done) => {
    let myCard = new Card({userId: "54cd6669d3e0fb1b302e54e6", question: 'Cutest puppy?', answer: 'Luke', category: 'Dogs'}).save().then(cat => {
      request(app)
        .delete('/api/card/' + myCard._userId + '/delete')
        .expect(200)
        .expect(res => {
          expect(res.body.message).to.equal('Success');
        }).end(done);
    });

  });

  // it('can create card at POST /api/card', (done) => {
  //   request(app)
  //     .post('/api/card')
  //     .send({userId: "54cd6669d3e0fb1b302e54e6", question: 'Cutest puppy?', answer: 'Luke', category: 'Dogs'})
  //     .expect(201)
  //     .expect(res.body.data.category).to.equal('Dogs').end(done);
  //   });

});





//user model
// describe('user model tests', () => {
//   beforeEach((done) => {
//     User.deleteMany({}).then(() => {done()});
//   });
//
//   afterEach((done) => {
//     User.deleteMany({}).then(() => {done()});
//   });
//
//   it('will not login if invalid pw', (done) => {
//     createUser('bunnies', 'cute').then(user => {
//       login('bunnies', 'fluffy').then(result => {
//         expect(result).to.equal(false);
//         done();
//       });
//     });
//   });
//
//   it('will not login if invalid user', (done) => {
//     createUser('bunnies', 'cute').then(user => {
//       login('puppies', 'cute').then(result => {
//         expect(result).to.equal(false);
//         done();
//       });
//     });
//   });
//
//   it('will login if valid user + pw', (done) => {
//     createUser('bunnies', 'cute').then(user => {
//       login('bunnies', 'cute').then(result => {
//         expect(result).to.equal(true);
//         done();
//       });
//     });
//   });
//
//
//   it('can create password object from string', (done) => {
//     let pwObject = createPasswordObject('password', 'a');
//     let expectedPwObject = {iterations: 100, salt: 'a', hash: 'pXN2J2eBnwuoYVeJYCTw0PYUnG8qxBl48AnMa94Q8tPxVnH9adPS/Upk314EdPVLk9NGEsET5/5eO0L8KEAIZAZblXsjN/nY0lGeu6dQlu+qagQLtk3jTChiYLQ32w+bPoXEQeMAreJLtqNNLeaT2SY7y4Q8/uU1JGdcDKpXWrR/ZQ8iKEpJ0DKY8BKZEoWk1vYGbLQt6miO8y+zRSzQyN1YRZNkw4XF0AA7stxaRYD/MlL7bcP8rYYHGxVM5dQpsFK3amD4ObCkixeFe982W6JQYD22PpQ3dt2QAzovMFAVgCyxYfMg4FK+cHcSBIzoriIsMUCjO0I2NPyOUesOog=='};
//     expect(pwObject).to.not.equal(null);
//     expect(pwObject).to.deep.equal(expectedPwObject);
//     done();
//   });
//
//   it('can create a user with pw object', (done) => {
//     createUser('username', 'password').then(result =>{
//       expect(result.username).to.equal('username');
//       expect(result.password.hash.length).to.equal(344);
//       done();
//     });
//   });
//
// });




//sanity testing
describe('sanity testing: models', () => {
  it('sanity test', (done) => {
    expect(4).to.not.equal(5);
    done();
  });
});
