const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');

chai.use(chaiHttp);
const expect = chai.expect;

server.listen(4444);

describe('server.js', function() {
  this.timeout(5000);
  beforeEach((done) => {
    done();
  });

  afterEach((done) => {
      done();
  })

  it('responds to /', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res).to.have.status(200);
        done();
      });
  });
})