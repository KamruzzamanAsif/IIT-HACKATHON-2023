import { ethers } from "hardhat";
import fs from 'fs';
import path from 'path';

const contractDetailsDataPath = path.join(__dirname, "../", "frontend", "src", "info", "contractDetails.json");


const jsonData = fs.readFileSync(contractDetailsDataPath, 'utf8');
const jsonObject = JSON.parse(jsonData);

async function deployABX(){
  // const lockedAmount = ethers.utils.parseEther("1");

  const ABX = await ethers.getContractFactory("ArtBlockCurrency");
  const abx = await ABX.deploy();

  await abx.deployed();

  console.log("ABX contract deployed to: ", abx.address);

  jsonObject.contractAddress = abx.address;
  const updatedJsonData = JSON.stringify(jsonObject, null, 2);
  fs.writeFileSync(contractDetailsDataPath, updatedJsonData, 'utf8');
  return abx.address;
}


async function deployEtherToABXExchangeContract(abx_address: string){
  // const lockedAmount = ethers.utils.parseEther("1");

  const ABX = await ethers.getContractFactory("EtherToABX");
  const abx = await ABX.deploy(abx_address);

  await abx.deployed();

  console.log("Ether to ABX contract deployed to: ", abx.address);

  jsonObject.contractAddress = abx.address;
  const updatedJsonData = JSON.stringify(jsonObject, null, 2);
  fs.writeFileSync(contractDetailsDataPath, updatedJsonData, 'utf8');
}

async function main() {
  let abx_address = await deployABX();
  await deployEtherToABXExchangeContract(abx_address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
