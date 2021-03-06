const { expect } = require("chai");
const { getService } = require("./testUtils");
// const proxyquire = require("proxyquire");


let endPoint = "http://localhost:5000";

//Root End Point Prints Hello world
describe("Root End Point Test /", () => {
  it("Returns status 200", (done) => {
    getService(endPoint)
      .then(result => {
        const { response } = result;
        expect(response.statusCode).to.equal(200);
        done();
      })
      .catch(err => {
        done(err);
      })
  });

  it("Should Print Hello World", (done) => {
    getService(endPoint)
      .then(result => {
        const { body } = result;
        expect(body).to.equal("Hello World!");
        done();
      })
      .catch(err => {
        done(err);
      })

  });
});

//Gene Suggest End Point
describe("Gene Suggest Endpoint Test: /gene_suggest", function () {

  const geneURL = `${endPoint}/gene_suggest`;
  this.timeout(5000);

  it("Returns Status 200", (done) => {
    getService(geneURL)
      .then(result => {
        const { response } = result;
        expect(response.statusCode).to.equal(200);
        done();
      })
      .catch(err => {
        done(err);
      })
  });

  it("Limit Test", (done) => {
    getService(geneURL)
      .then(result => {
        const { body } = result;
        const response = JSON.parse(body).data;
        expect(response).to.have.lengthOf(10);
        done();
      })
      .catch(err => {
        done(err);
      })
  });

  it("Query Test", function (done) {
    getService(`${geneURL}?query=A1BG-AS1&species=homo_sapiens&limit=1`)
      .then(result => {
        const { body } = result;
        const response = JSON.parse(body).data;
        expect(response).to.have.lengthOf(1);
        expect(response[0]).to.equal("A1BG-AS1")
        done();
      })
      .catch(err => {
        done(err);
      })
  });

  it("Random Query Test/Should Return No Result", function (done) {
    getService(`${geneURL}?query=Random Key&species=homo_sapiens&limit=1`)
      .then(result => {
        const { body } = result;
        const response = JSON.parse(body).data;
        expect(response).to.have.lengthOf(0);
        done();
      })
      .catch(err => {
        done(err);
      })
  });

  it("No Qeuery Passed", function (done) {
    getService(`${geneURL}?species=homo_sapiens&limit=1`)
      .then(result => {
        const { body } = result;
        const response = JSON.parse(body).data;
        expect(response).to.have.lengthOf(1);
        done();
      })
      .catch(err => {
        done(err);
      })
  });

});


//Uniq Species End Point Test
describe("Uniq Species End Point Test: /unique_species", function () {

  const uniqueSpecies = `${endPoint}/unique_species`;
  this.timeout(5000);


  it("Returns status 200", (done) => {
    getService(uniqueSpecies)
      .then(result => {
        const { response } = result;
        expect(response.statusCode).to.equal(200);
        done();
      })
      .catch(err => {
        done(err);
      })
  });

  it("Must Return Result", (done) => {
    getService(uniqueSpecies)
      .then(result => {
        const { body } = result;
        const response = JSON.parse(body).data;
        expect(response.length).to.be.at.least(100);
        done();
      })
      .catch(err => {
        done(err);
      })
  });

  it("Species Validation, homo_sapiens", (done) => {
    getService(uniqueSpecies)
      .then(result => {
        const { body } = result;
        const response = JSON.parse(body).data;
        expect(response.length).to.be.at.least(100);
        expect(response).include("homo_sapiens");
        done();
      })
      .catch(err => {
        done(err);
      })
  });

  it("Species Should Not Contain XXXXXXXXXXXXXXXXX", (done) => {
    getService(uniqueSpecies)
      .then(result => {
        const { body } = result;
        const response = JSON.parse(body).data;
        expect(response.length).to.be.at.least(100);
        expect(response).not.include("XXXXXXXXXXXXXXXXX");
        done();
      })
      .catch(err => {
        done(err);
      })
  });
});



