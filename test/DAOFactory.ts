import { ethers } from 'hardhat';
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from 'chai';
import { DAOFactory, DAOFactory__factory, DAO__factory, DAO, ArtNFT__factory, ArtNFT, ABX, ABX__factory, DAO, DAO } from '../frontend/typechain'
import { Wallet } from 'ethers';
const hre = require("hardhat");



describe('DAO Factory Test Suite', () => {

  async function deployOnceFixture() {
    const [owner, acc1, acc2,...otherAccounts] = await ethers.getSigners();
    const abx: ABX = await new ABX__factory(owner).deploy();
    const art: ArtNFT = await new ArtNFT__factory(owner).deploy("0xb8476f31E076e00683e2D1D3Cc87097C6A5dB0F6");
    const daofactory: DAOFactory = await new DAOFactory__factory(owner).deploy(art.address);
    await abx.approve(daofactory.address, 100000);
    return { abx, art, daofactory, owner, acc1, otherAccounts };
  }

  it("Create DAO", async function () {
    const { abx, art, daofactory, owner, acc1, otherAccounts } = await loadFixture(deployOnceFixture);
    const daofactory_object = await daofactory.createDAO("Abhi Fan Club", "Abhi Token", "ABJToken");
    const dao_address = daofactory_object.value;
    // uwu
  });
});


