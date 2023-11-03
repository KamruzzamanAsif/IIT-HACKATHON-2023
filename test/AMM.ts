import { ethers } from 'hardhat';
import { AMM__factory, AMM } from '../frontend/typechain';
import { expect } from 'chai';

describe('AMM Test Suite', () => {
  let amm: AMM;
  let tokenA: any; // Replace with your ERC20 token contract
  let tokenB: any; // Replace with your ERC20 token contract
  let owner: any;
  let user: any;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();
    const DAOFactory = await ethers.getContractFactory("DAOFactory"); // Replace with your ERC20 contract factory
    const daofactory = await DAOFactory.connect(owner).deploy(owner.address);

    const daoAId = await daofactory.connect(owner).createDAO("A Community", "A Token", "A");
    const daoBId = await daofactory.connect(owner).createDAO("B Community", "B Token", "B");
    const tokenList = await daofactory.getAllTokenList();

    tokenA = await ethers.getContractAt("ERC20Factory", tokenList[daoAId.value]);
    tokenB = await ethers.getContractAt("ERC20Factory", tokenList[daoBId.value]);

    console.log(await tokenA.balanceOf(owner.address));

    await tokenA.connect(owner).mint(user.address, 10000); // Mint 10,000 tokens to user's address
    await tokenB.connect(owner).mint(user.address, 10000); // Mint 10,000 tokens to user's address


    const AMMFactory = await ethers.getContractFactory("AMM");
    amm = await AMMFactory.deploy(tokenA.address, tokenB.address);
  });

  it("should add liquidity", async () => {
    const amountA = 1000;
    const amountB = 2000;
    await tokenA.connect(owner).approve(amm.address, 10000);
    await tokenB.connect(owner).approve(amm.address, 10000);

    await amm.connect(owner).addLiquidity(amountA, amountB);

    expect(await amm.reserveA()).to.equal(amountA);
    expect(await amm.reserveB()).to.equal(amountB);
  });

  it("should swap tokenA for tokenB", async () => {
    const amountIn = 100;
    await tokenA.connect(user).approve(amm.address, amountIn);

    const balanceABefore = await tokenA.balanceOf(user.address);
    const balanceBBefore = await tokenB.balanceOf(user.address);

    await amm.connect(user).swap(amountIn, true);

    const balanceAAfter = await tokenA.balanceOf(user.address);
    const balanceBAfter = await tokenB.balanceOf(user.address);

    expect(balanceAAfter.sub(balanceABefore)).to.equal(-100);
    expect(balanceBBefore.sub(balanceBAfter)).to.gt(0);
  });

  it("should swap tokenB for tokenA", async () => {
    const amountIn = 100;
    await tokenB.connect(user).approve(amm.address, amountIn);

    const balanceABefore = await tokenA.balanceOf(user.address);
    const balanceBBefore = await tokenB.balanceOf(user.address);

    await amm.connect(user).swap(amountIn, false);

    const balanceAAfter = await tokenA.balanceOf(user.address);
    const balanceBAfter = await tokenB.balanceOf(user.address);

    expect(balanceABefore.sub(balanceAAfter)).to.gt(0);
    expect(balanceBAfter.sub(balanceBBefore)).to.equal(-100);
  });
});
