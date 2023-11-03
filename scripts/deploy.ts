import { ethers } from "hardhat";
import fs from 'fs';
import path from 'path';
import { Address } from "cluster";

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

async function deployArtNFT(){
  // const lockedAmount = ethers.utils.parseEther("1");

  const ArtNFT = await ethers.getContractFactory("ArtNFT");
  const artnft = await ArtNFT.deploy("0xb8476f31E076e00683e2D1D3Cc87097C6A5dB0F6");

  await artnft.deployed();

  console.log("ArtNFT contract deployed to: ", artnft.address);

  jsonObject.contractAddress = artnft.address;
  const updatedJsonData = JSON.stringify(jsonObject, null, 2);
  fs.writeFileSync(contractDetailsDataPath, updatedJsonData, 'utf8');
  return artnft.address;
}

async function deployDAOFactory(nft_address: any){
  // const lockedAmount = ethers.utils.parseEther("1");

  const DAOFactory = await ethers.getContractFactory("DAOFactory");
  const daofactory = await DAOFactory.deploy(nft_address);

  await daofactory.deployed();

  console.log("DAOFactory contract deployed to: ", daofactory.address);

  jsonObject.contractAddress = daofactory.address;
  const updatedJsonData = JSON.stringify(jsonObject, null, 2);
  fs.writeFileSync(contractDetailsDataPath, updatedJsonData, 'utf8');
  return daofactory.address;
}

async function main() {
  let abx_address = await deployABX();
  await deployEtherToABXExchangeContract(abx_address);
  let nft_address = await deployArtNFT();
  await deployDAOFactory(nft_address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
