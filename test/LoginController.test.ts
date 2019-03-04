
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Base64 } from 'js-base64';

import app from '../src/app/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST /login', () => {

  let userCredentials = {
    email: 'msarthur@example.com', 
    password: Base64.encode('secret')
  }

  it('response should have a valid oauth token', () => {

    // CryptoJS.PBKDF2(password, salt, { keySize: 512/32, iterations: iterations });

    return chai.request(app).
      post('/login')
      .set('content-type', 'application/json')
      .send(userCredentials)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body.token).not.to.be.undefined;
        expect(res.body.success).to.be.true;
      });
  });

  it('response should fail when no email/password is provided', () => {

    // CryptoJS.PBKDF2(password, salt, { keySize: 512/32, iterations: iterations });

    return chai.request(app).
      post('/login')
      .set('content-type', 'application/json')
      .send({})
      .then(res => {
        expect(res.status).to.equal(400);
        expect(res).to.be.json;
        expect(res.body.success).to.be.false;
      });
  });

  it('response should fail when wrong password is provided', () => {

    userCredentials.password = Base64.encode('wrong-secret');

    return chai.request(app).
      post('/login')
      .set('content-type', 'application/json')
      .send(userCredentials)
      .then(res => {
        expect(res.status).to.equal(403);
        expect(res).to.be.json;
        expect(res.body.success).to.be.false;
      });
  });

  it('response should fail when wrong username is provided', () => {

    userCredentials.email = "wrong@example.com"

    return chai.request(app).
      post('/login')
      .set('content-type', 'application/json')
      .send(userCredentials)
      .then(res => {
        expect(res.status).to.equal(403);
        expect(res).to.be.json;
        expect(res.body.success).to.be.false;
      });
  });
});