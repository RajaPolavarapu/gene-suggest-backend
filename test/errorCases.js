const { expect, assert } = require("chai");
const request = require("request");
const sinon = require('sinon');
const proxyquire = require("proxyquire");
const { getService } = require("./testUtils");
const app = require("../index");
const { connection } = require("../helpers");

let endPoint = "http://localhost:5000";

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