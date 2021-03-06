const { expect } = require("chai");
const sinon = require('sinon');
const proxyquire = require("proxyquire");
const { connection } = require("../helpers");

describe('Error Cases Test', function () {
    beforeEach(function() {
      proxyquire('../helpers', { connection: sinon.spy() } );
    });
  
    this.timeout(5000);
    it("MySQL Connection should return error", (done) => {
      connection.connect((err, result) => {
        if (err) {
          expect(err.code).to.equal("PROTOCOL_ENQUEUE_HANDSHAKE_TWICE")
        }
      });
      done();
    });
  });