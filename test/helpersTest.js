const { expect, assert } = require("chai");
const request = require("request");
const sinon = require('sinon');
const proxyquire = require("proxyquire");
const { getService } = require("./testUtils");
const app = require("../index");
const { errorResult, prepareQuery } = require("../helpers");

let endPoint = "http://localhost:5000";

describe("Helpers Test", function () {

    it("Error Result Call Test", () => {
        const result = errorResult({ err: {}, result: null });
        expect(result.status).to.equal('failed');
    });

    it("prepareQuery Test", function() {
        const limit = null;
        const query = prepareQuery({query: "", limit, species: ""});
        expect(query).to.equal(`select DISTINCT display_label from gene_autocomplete LIMIT 0, 10`)
    });
    
});