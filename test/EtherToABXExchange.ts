import { ethers } from 'hardhat';
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from 'chai';
import { ABX__factory, ABX, EtherToABX__factory, EtherToABX } from '../frontend/typechain'
import { Wallet } from 'ethers';
const hre = require("hardhat");



describe('EtherToABX Test Suite', () => {

  async function deployOnceFixture() {
    const [owner, acc1, acc2,...otherAccounts] = await ethers.getSigners();
    const abx: ABX = await new ABX__factory(owner).deploy();
    const ethertoabx: EtherToABX = await new EtherToABX__factory(owner).deploy(abx.address);
    return { abx, ethertoabx, owner, otherAccounts };
  }

  it("Check add_ABX_liquidity() Function.", async function () {
    const { abx, ethertoabx, owner, otherAccounts } = await loadFixture(deployOnceFixture);

    await abx.approve(ethertoabx.address, 10000);
    await ethertoabx.add_ABX_liquidity(10000);
    expect(await ethertoabx.etherReserve===1000);
    expect(await abx.balanceOf(owner.address)).to.equal(9999999999999999999990000n);
  });


  it("Check ethToAbx() Function.", async function () {
    const { abx, ethertoabx, owner, otherAccounts } = await loadFixture(deployOnceFixture);
    await abx.approve(ethertoabx.address, 10000);
    await ethertoabx.add_ABX_liquidity(10000);

    ethertoabx.connect(otherAccounts[0]).ethToAbx( {
      value: ethers.utils.parseEther("0.00000000000000001") // 10wei
    });
    expect(await ethertoabx.ABXReserve===10000-20);
    //expect(await abx.balanceOf(otherAccounts[0].address)).to.equal(20);
  });
});


