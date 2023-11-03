import { ethers } from 'hardhat';
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from 'chai';
import { DAO__factory, DAO, ArtNFT__factory, ArtNFT, ABX, ABX__factory } from '../frontend/typechain'
import { Wallet } from 'ethers';
const hre = require("hardhat");



describe('DA) Test Suite', () => {

  async function deployOnceFixture() {
    const [owner, acc1, acc2,...otherAccounts] = await ethers.getSigners();
    const abx: ABX = await new ABX__factory(owner).deploy();
    const art: ArtNFT = await new ArtNFT__factory(owner).deploy("0xb8476f31E076e00683e2D1D3Cc87097C6A5dB0F6");
    const dao: DAO = await new DAO__factory(owner).deploy("Abhi Fan Club",abx.address,art.address);

    await abx.approve(dao.address, 100000);
    return { dao, owner, acc1, otherAccounts };
  }

  it("Register a dao", async function () {
    const { dao, owner, acc1, otherAccounts } = await loadFixture(deployOnceFixture);
    // transfer abx: no need, owner deployed ABX so he has 1M abx by default.
    const pid_object = await dao.propose("Exposing abhijitt!", "Abhi is an alien actually, we dont know it!", "ipfs://art.abhi.com", 10, 2, 1); //10ABX, 2s, 1 = genre code, 10=
    const pid = pid_object.value;
    expect(await dao.getContractInfo(pid)).to.equal("Exposing abhijitt!");
  });
});


