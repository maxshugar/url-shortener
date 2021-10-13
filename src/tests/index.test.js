const chai = require("chai");
const chaiHttp = require("chai-http");
const { startExpress } = require("../util/express");
const { startMongoDB } = require("../util/mongoDB");
const { connectMongoose } = require("../util/mongoose");
const should = chai.should();

chai.use(chaiHttp);

const setupMockServer = async () => {
  // Start the express server.
  const app = await startExpress();
  // Start the mongodb in-memory server.
  const mongoUri = await startMongoDB();
  // Connect mongoose to mongodb server.
  await connectMongoose(mongoUri);
  // Return the app for chai-http.
  return app;
};

let server;
let links = [];

describe("Little Links ™", () => {
  before(async () => {
    // Start mongodb and express server.
    server = await setupMockServer();
  });

  describe("Shorten", () => {
    it("It should return http status code 400 when missing 'originalUrl' in request body.", (done) => {
      chai
        .request(server)
        .post("/shorten")
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.equal(
            "Parameter 'originalUrl' missing from request body."
          );
          done();
        });
    });
    it("It should return http status code 400 when originalUrl is not a valid uri.", (done) => {
      chai
        .request(server)
        .post("/shorten")
        .set("content-type", "application/json")
        .send({ originalUrl: "abc123" })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.equal("Original url invalid.");
          done();
        });
    });
    it("It should return http status code 200 and a shortened url when originalUrl is a valid uri.", (done) => {
      chai
        .request(server)
        .post("/shorten")
        .set("content-type", "application/json")
        .send({ originalUrl: "https://facebook.com" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("littleLink");
          links.push(res.body.littleLink);
          done();
        });
    });
    it("It should return the same shortened url for previously shortened urls.", (done) => {
        chai
          .request(server)
          .post("/shorten")
          .set("content-type", "application/json")
          .send({ originalUrl: "https://facebook.com" })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("littleLink");
            res.body.littleLink.should.equal(links[0]);
            done();
          });
      });
  });
  describe('Redirect', () => {
    
  })
});
