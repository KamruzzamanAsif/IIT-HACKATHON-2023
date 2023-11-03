import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';

describe('MarketPlace', function () {
  let owner: SignerWithAddress;
  let buyer: SignerWithAddress;
  let marketPlace: any; // Replace with the actual contract type
  let nftToken: any; // Replace with the actual contract type
  let nativeToken: any; // Replace with the actual contract type
  const nftId = 1;
  const initialBalance = 10000000;

  beforeEach(async function () {
    [owner, buyer, owner] = await ethers.getSigners();

    // Deploy the ERC20 token contracts for native and NFT tokens
    const NativeToken = await ethers.getContractFactory('ERC20Factory');
    nativeToken = await NativeToken.deploy(100000000, "nativetoken", "NT", owner.address);

    const NFTToken = await ethers.getContractFactory('ArtNFT');
    nftToken = await NFTToken.deploy(owner.address);

    // Deploy the MarketPlace contract
    const MarketPlace = await ethers.getContractFactory('MarketPlace');
    marketPlace = await MarketPlace.deploy(nativeToken.address, nftToken.address);
  });

  it('should get all products on sale', async function () {
    const price = 100;
    await nativeToken.connect(owner).approve(marketPlace.address, price);
    await marketPlace.connect(owner).upload_new_product(nftId, price);

    const productsOnSale = await marketPlace.getAllProductsOnSale();
    expect(productsOnSale).to.deep.equal([nftId]);
  });
});
