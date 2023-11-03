import { ethers } from 'hardhat';
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from 'chai';
import { ABX, ABX__factory, ArtNFT, ArtNFT__factory, MultiAuction, MultiAuction__factory, DAO, DAOFactory, DAO__factory, DAOFactory__factory, DAO } from '../frontend/typechain'
import { Wallet } from 'ethers';
const hre = require("hardhat");

describe('Multi-auction Test Suite', () => {

  async function deployOnceFixture() {
    const [owner, acc1, acc2,...otherAccounts] = await ethers.getSigners();
    const abx: ABX = await new ABX__factory(owner).deploy();
    const art: ArtNFT = await new ArtNFT__factory(owner).deploy("0xb8476f31E076e00683e2D1D3Cc87097C6A5dB0F6");
    const daofactory: DAOFactory = await new DAOFactory__factory(owner).deploy(art.address);

    await abx.approve(daofactory.address, 100000);
    const daofactory_object = await daofactory.createDAO("Abhi Fan Club", "Abhi Token", "ABJToken");
    const daoid = daofactory_object.value;
    const daoTokenList = await daofactory.getAllTokenList();
    const daoToken = daoTokenList.at(daoid);
    const daoAddressList = await daofactory.getAllCommunityAddress();

    const dao = await ethers.getContractAt("DAO", daoAddressList[daoid]);
    const pid_object = await dao.propose("Exposing abhijitt!", "Abhi is an alien actually, we dont know it!", "ipfs://art.abhi.com", 10, 2, 1); //10ABX, 2s, 1 = genre code, 10=
    const pid = pid_object.value;
    await dao.vote(pid, true);
    let nftObject = await dao.execute(pid);
    let nftid = nftObject.value;
    console.log("Control reaches here...");
    const multiauction : MultiAuction = await new MultiAuction__factory(owner).deploy(daoToken);

    return { abx, multiauction, art, daoid, dao, daoToken, nftid, daofactory, owner, acc1, otherAccounts };
  }

  it("Check Community Token", async function () {
    const { multiauction, daoid, daofactory, otherAccounts } = await loadFixture(deployOnceFixture);
    const daoTokenList = await daofactory.getAllTokenList();
    const daoToken = daoTokenList.at(daoid);
    expect(await multiauction.getNativeTokenAddress()).to.be.equal(daoToken);
  });

  it("Create auction and put your item", async function () {
    const { multiauction, daoid, art, dao, daofactory, nftid, owner, otherAccounts } = await loadFixture(deployOnceFixture);
    await multiauction.createAuction(10, 1, art.address, nftid);
    expect(await multiauction.auctions.length==1);
  });
  it("Buy from the auction", async function () {
    const { abx, multiauction, daoid, art, dao, owner, daoToken, daofactory, nftid, otherAccounts } = await loadFixture(deployOnceFixture);
    const auctionIdObject = await multiauction.createAuction(10, 1, art.address, nftid);

    const currentPriceObject = await multiauction.getCurrentPrice(auctionIdObject.value);
    const communityTokenInstance = await ethers.getContractAt("ERC20Factory", daoToken);

    await communityTokenInstance.approve(multiauction.address, ethers.utils.parseEther("100")); // Assuming tokens have 18 decimal places and you want to approve 10 tokens
    await multiauction.buy(auctionIdObject.value, currentPriceObject.value);
    expect(await multiauction.auctions.length==1);
  });
});

