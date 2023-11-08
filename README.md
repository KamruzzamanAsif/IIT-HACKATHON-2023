# ArtBlock Platform
🏆 We are proud to announce that we became the 1st runner up in the competition! 🥇

ArtBlock is a creator based community that focuses on specific type of art. These communities are a form of DAO. A DAO platform with native currency and a DeX for liquidity among the currency. Additionally, the platform can post IPFS art content and after voting, the arts are minted as quality NFT with certainty. Royalty is storngly tracked over all NFT exchange. Dutch Auction system and a market place are used for the communiation and exchange of the tokens.


Check [Code-Documentation.org](https://github.com/KamruzzamanAsif/IIT-HACKATHON-2023/blob/main/Code-Documentation.org) for more information.

# Features
![alt text](https://github.com/KamruzzamanAsif/IIT-HACKATHON-2023/blob/main/resources/Test_Coverage.png?raw=true)


1. Buy ABX Tokens with fixed ethers.
2. Create new communities with ABX Tokens.
3. Communities have their own tokens, exchangeable for ABX Tokens.
4. Communities have a DEX with ABX Tokens and native tokens.
5. DEX uses CPAMM with the x*y=k equation.
6. Creators share art for approval using native tokens.
7. Community votes on approval with upvote/downvote (weighted).
8. Artists host Dutch auctions for exclusive items.
9. Exclusive art becomes non-transferable tokens.
10. General art becomes NFTs.
11. ArtBlock marketplace for selling art in community tokens.
12. Original creators set resale royalties


## Prerequisite
```
Node js
npm
yarn
```
## Install dependencies
Install yarn:
```
npm i -g yarn
```
For contract dev:
Run this command on the root folder:
```
yarn
```

For Frontend dev:
Go to `frontend` folder and install node modules:
```
cd frontend
yarn

```

## Instruction
- Install a wallet like [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)
- Copy `.env.example` to `.env`
  * Mac or Linux
    * ```cp .env.example .env```
  * Windows
    * ```copy .env.example .env```
- Set the env variable in `.env` file on root level and on `frontend` folder:

Variable descriptions:

1. `RPC_NODE_API_KEY`: Get from [Alchemy site](https://auth.alchemy.com/signup/) after sign up and login
2. `PRIVATE_KEY`: Export private key from metamask, follow these [instructions](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key)
3. `ETHERSCAN_API_KEY`: Get from [etherscan](https://etherscan.io/login)

Frontend ENV Variable:
4. `NEXT_PUBLIC_ALCHEMY_API_KEY` : Same as `RPC_NODE_API_KEY` 
- Compile Contract:
```
npm run compile
```
- Run test:
```
npm run test
```
- Deploy
```
npm run deploy:<network>
```
- Verify on etherscan
```
npx hardhat verify --network sepolia <YOUR_CONTRACT_ADDRESS> <Paramaters>
```
For example for `ArtBlockPlatform` contract:
```
npx hardhat verify --network sepolia 0xAECD7dFD9d5ED08EA916B052D90A75366B963A61 "Hello world"
```

# External Sources
1. https://itnext.io/building-a-decentralized-autonomous-organization-dao-from-scratch-a2846725013b
2. https://dev.to/fassko/implementing-the-erc-2981-nft-royalty-standard-with-solidity-a-game-changer-for-creators-to-receive-income-from-every-sale-1e6j
3. https://solidity-by-example.org/defi/constant-product-amm/
