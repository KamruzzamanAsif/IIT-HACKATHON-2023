import { ethers } from 'hardhat';
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from 'chai';
import { ArtNFT__factory, ArtNFT } from '../frontend/typechain'
import { Wallet } from 'ethers';
const hre = require("hardhat");



describe('ArtNFT Test Suite', () => {

  async function deployOnceFixture() {
    const [owner, acc1, acc2,...otherAccounts] = await ethers.getSigners();
    const artnft: ArtNFT = await new ArtNFT__factory(owner).deploy("0xb8476f31E076e00683e2D1D3Cc87097C6A5dB0F6");
    return { artnft, owner, acc1, otherAccounts };
  }

  it("Mint an NFT", async function () {
    const { artnft, owner, acc1, otherAccounts } = await loadFixture(deployOnceFixture);
    let nftid = await artnft.safeMint(acc1.address, "ipfs://abj-paul.github.io", 10);
    console.log(nftid.value);
    expect(await artnft.ownerOf(nftid.value)).to.equal(acc1.address);
    expect(await artnft.balanceOf(acc1.address)).to.equal(1);

  });

  it("Check royalty amount after minting", async function () { // TODO
    const { artnft, owner, acc1, otherAccounts } = await loadFixture(deployOnceFixture);
    let nftid = await artnft.safeMint(acc1.address, "ipfs://abj-paul.github.io", 10);
    //expect(await artnft.balanceOf(acc1.address)).to.equal(10); 
  });

  it("Transfer NFT", async function () {
    const { artnft, owner, acc1, otherAccounts } = await loadFixture(deployOnceFixture);
    let nftid = await artnft.safeMint(acc1.address, "ipfs://abj-paul.github.io", 10);
    await artnft.connect(acc1).transferFrom(acc1.address, otherAccounts[0].address ,nftid.value);

    expect(await artnft.ownerOf(nftid.value)).to.equal(otherAccounts[0].address);
    expect(await artnft.balanceOf(acc1.address)).to.equal(0);
    expect(await artnft.balanceOf(otherAccounts[0].address)).to.equal(1);
  });

});


