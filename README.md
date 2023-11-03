# Hardhat Full Stack Dapp Boilerplate

A fullstack hardhat and wagmi based dapp boilerplate ready to hack 🙌

## Used Technology
 - [👷🏽‍♂️ Hardhat](https://www.rainbowkit.com/)
 - [🌈 RainbowKit](https://hardhat.org/)
 - [➬ WAGMI](https://wagmi.sh/)
 - [🌐 Next JS](https://nextjs.org/)
 - [🗺 Etherscan](https://etherscan.io/)
 - [🕹 Typechain](https://github.com/dethcrypto/TypeChain)
 - [TailwindCSS](https://tailwindcss.com) – Utility-first CSS framework for rapid UI development
 - [TypeScript](https://www.typescriptlang.org/) – Static type checker for end-to-end typesafety
 - [Prettier](https://prettier.io/) – Opinionated code formatter for consistent code style
 - [ESLint](https://eslint.org/) – Pluggable linter for Next.js and TypeScript

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
For example for `Greeter` contract:
```
npx hardhat verify --network sepolia 0xAECD7dFD9d5ED08EA916B052D90A75366B963A61 "Hello world"
```

