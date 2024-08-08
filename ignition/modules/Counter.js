import pkg from "hardhat";
const { ethers } = pkg;

const main = async () => {
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy(2);
  await counter.deployed();
  console.log(`Deployed Counter Contract at: ${counter.address}\n`);
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
