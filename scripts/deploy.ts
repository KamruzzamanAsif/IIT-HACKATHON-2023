import { ethers } from "hardhat";
import fs from 'fs';
import path from 'path';

const contractDetailsDataPath = path.join(__dirname, "../", "frontend", "src", "info", "contractDetails.json");


const jsonData = fs.readFileSync(contractDetailsDataPath, 'utf8');
const jsonObject = JSON.parse(jsonData);


async function main() {
  // const lockedAmount = ethers.utils.parseEther("1");

  const Greeter = await ethers.getContractFactory("Greeter");
  // const greeting = await Greeting.deploy("Hello world", { value: lockedAmount });
  const greeter = await Greeter.deploy("Hello world");

  await greeter.deployed();

  console.log("Greeting contract deployed to: ", greeter.address);

  jsonObject.contractAddress = greeter.address;
  const updatedJsonData = JSON.stringify(jsonObject, null, 2);
  fs.writeFileSync(contractDetailsDataPath, updatedJsonData, 'utf8');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
