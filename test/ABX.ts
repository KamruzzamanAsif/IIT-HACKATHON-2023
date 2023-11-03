import { ethers } from 'hardhat';
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from 'chai';
import { ABX__factory, ABX } from '../frontend/typechain'


describe('ABX Test Suite', () => {

  async function deployOnceFixture() {
    const [owner, acc1, acc2,...otherAccounts] = await ethers.getSigners();
    const abx: ABX = await new ABX__factory(owner).deploy();
    return { abx, owner, acc1, acc2, otherAccounts };
  }

  it("Check initial amount", async function () {
    const { abx, owner, acc1, acc2, otherAccounts } = await loadFixture(deployOnceFixture);
    expect(await abx.balanceOf(owner.address)).to.equal(10000000000000000000000000n);
  });

  it("Transfer Money", async function () {
    const { abx, owner, acc1, acc2, otherAccounts } = await loadFixture(deployOnceFixture);
    await abx.transfer(acc1.address, 100);
    expect(await abx.balanceOf(acc1.address)).to.equal(100);
  });
});
