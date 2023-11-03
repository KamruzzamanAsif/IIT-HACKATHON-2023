import { ethers } from 'hardhat';
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from 'chai';
import { Greeter__factory, Greeter } from '../frontend/typechain'


describe('greeter', () => {

  async function deployOnceFixture() {
    const [owner, ...otherAccounts] = await ethers.getSigners();
    const greeter: Greeter = await new Greeter__factory(owner).deploy("Hello world!");
    return { greeter, owner, otherAccounts };
  }

  it("Check initial greet", async function () {
    const { greeter, owner } = await loadFixture(deployOnceFixture);
    expect(await greeter.greet()).to.equal("Hello world!");
  });

	it("Should return the new greeting once it's changed", async () => {
    const { greeter } = await loadFixture(deployOnceFixture);
		let tx = await greeter.setGreeting('Hola, mundo!');
    await tx.wait();
		expect(await greeter.greet()).to.equal('Hola, mundo!');
	});

  it("Send ether to payment function", async function () {
    const { greeter, owner } = await loadFixture(deployOnceFixture);
    const payMeTx = await greeter.payMe({
      value: ethers.utils.parseEther("0.2")
    });
    await payMeTx.wait();
    const balance = Number(await greeter.connect(owner).provider.getBalance(greeter.address))
    expect(ethers.utils.formatEther(balance+"") == "0.2");
  });

});