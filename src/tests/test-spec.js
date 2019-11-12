const { expect } = require("chai");
const db = require("../../db/db");
const app = require("supertest")(require("../../server/api"));

//Supertest for routes and api testing
//const app = require('supertest')(require('../../server/server.js'))

describe("ACME Store", () => {
  let seed;
  beforeEach(async () => (seed = await db.syncAndSeed()));
  describe("Data Layer", () => {
    //Paul's test 1
    it("Product 1 and Product 2 names", () => {
      expect(seed.products.product1.productName).to.equal(
        "Rocket Powered Roller Skates"
      );
      expect(seed.products.product2.productName).to.equal(
        "Jet Propelled Tennis Shoes"
      );
    });
    //Paul's test 2
    it("Check User emails", () => {
      expect(seed.users.jamesUser.email).to.equal("archer@gmail.com");
      expect(seed.users.paulUser.email).to.equal("saber@gmail.com");
    });
    //Paul's test 3
    it("Check that Order belongs to User", () => {
      expect(seed.orders.order1.userId).to.equal(seed.users.dominiqueUser.id);
    });
    //Rob's test 1
    it("checks that password is encrypted with all numbers", () => {
      expect(Number(seed.users.jamesUser.password)).to.not.equal(NaN);
    });
    //Rob's test 2
    it("checks that encrypted password length is more than 30", () => {
      expect(seed.users.jamesUser.password.length).to.be.greaterThan(30);
      expect(seed.users.jamesUser.password.length).to.be.greaterThan(30);
    });
    //Paul test 4
    describe("GET /api/products", () => {
      it("returns the products", () => {
        return app
          .get("/products")
          .expect(200)
          .then(response => {
            expect(response.body.length).to.equal(14);
          });
      });
    });
  });
});

//Started testing API and routes

/*
describe('API tests', () => {
  //let seed;
  //beforeEach(async () => (seed = await db.syncAndSeed()));
  describe("Testing API and routes", () => {
    it('tests products', () => {
      return app.get('/api/products')
      .expect(200)
      .then (response => {
        console.log(response)
      })
    })
  })

})

*/
