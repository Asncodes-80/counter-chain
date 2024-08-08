import chai, { expect } from "chai";

describe("Counter app", () => {
  let counter;

  let deployer;
  let signer;

  beforeEach(async () => {
    [deployer, signer] = await ethers.getSigners();

    const counterProvider = await ethers.getContractFactory("Counter");
    counter = await counterProvider.deploy(2);
  });

  describe("Operations", () => {
    it("Check current number should be 2", async () => {
      const value = await counter.value();
      expect(value).to.equal(2);
    });

    describe("Increment", () => {
      let transaction;

      beforeEach(async () => {
        transaction = await counter.connect(deployer).increase();
        await transaction.wait();
      });

      it("Should increase one number", async () => {
        const countValue = await counter.value();
        expect(countValue).to.equal(3);
      });

      it("Once in action", async () => {
        transaction = await counter.connect(deployer).decrease();
        await transaction.wait();

        const countValue = await counter.value();
        expect(countValue).to.equal(2);
      });
    });

    describe("Decrement", () => {
      let transaction;

      beforeEach(async () => {
        transaction = await counter.connect(deployer).decrease();
        await transaction.wait();
      });

      it("Should decrease one number", async () => {
        const countValue = await counter.value();
        expect(countValue).to.equal(1);
      });
    });
  });
});
