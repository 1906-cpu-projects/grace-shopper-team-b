const { expect } = require("chai");
const db = require("../../db/db");

describe("ACME Store", () => {
  let seed;
  beforeEach(async () => (seed = await db.syncAndSeed()));
  describe("Data Layer", () => {
    it("Product 1 and Product 2 names", () => {
      expect(seed.products.product1.productName).to.equal(
        "Rocket Powered Roller Skates"
      );
      expect(seed.products.product2.productName).to.equal(
        "Jet Propelled Tennis Shoes"
      );
    });
    it("Check User emails", () => {
      expect(seed.users.jamesUser.email).to.equal("archer@gmail.com");
      expect(seed.users.paulUser.email).to.equal("saber@gmail.com");
    });
    it("Check that Order belongs to User", () => {
      expect(seed.orders.order1.userId).to.equal(seed.users.dominiqueUser.id);
    });
  });
});
