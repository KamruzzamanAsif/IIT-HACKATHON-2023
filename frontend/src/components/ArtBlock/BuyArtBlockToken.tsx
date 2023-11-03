import React, { useState } from 'react';
import EtherToABXABI from '../../contractInfo/EtherToABX/EtherToABXABI.json';
import EtherToABXAddress from '../../contractInfo/EtherToABX/EtherToABXAddress.json';
import ABXABI from '../../contractInfo/ABX/ABXABI.json';
import ABXAddress from '../../contractInfo/ABX/ABXAddress.json';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { useEffect } from 'react';


export default function BuyArtBlockToken() {
  const [buyAmount, setBuyAmount] = useState<number>(0);
  const [abxtoken, setAbxtoken] = useState<string>("");

  const { address, isConnected, connector } = useAccount({
    async onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected })
    },
  })

  const createABXToEthContract = (): ethers.Contract | null => {
    const { ethereum } = window as Window & { ethereum?: any };

    const contractAddress = EtherToABXAddress.contractAddress;
    const contractABI = EtherToABXABI.abi;
    
    if (typeof ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const Contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );      
      return Contract;
    }
    return null;
  };

  const createABXContract = (): ethers.Contract | null => {
    const { ethereum } = window as Window & { ethereum?: any };

    const contractAddress = ABXAddress.contractAddress;
    const contractABI = ABXABI.abi;
    
    if (typeof ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const Contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );      
      return Contract;
    }
    return null;
  };

  async function approve(contract) {
    const spenderAddress = EtherToABXAddress.contractAddress;
    const amountToApprove = 100;

    try {
        // Estimate the gas limit for the `approve` function call
        const gasEstimation = await contract.estimateGas.approve(spenderAddress, amountToApprove);

        console.log("Gas Estimation:", gasEstimation);

        // You can add a margin to the gas estimation if needed
        const gasLimitWithMargin = gasEstimation.mul(2);

        // Send the transaction with the estimated gas limit
        const tx = await contract.approve(spenderAddress, amountToApprove, {
            gasLimit: gasLimitWithMargin.toHexString()
        });

        const receipt = await tx.wait();
        console.log("approve", receipt);
    } catch (error) {
        console.error("Error estimating or sending transaction:", error);
    }
}


  async function addLiquidity(contract) {
    const amount = 100;

    try {
        // Estimate the gas limit for the `add_ABX_liquidity` function call
        const gasEstimation = await contract.estimateGas.add_ABX_liquidity(amount);

        console.log("Gas Estimation:", gasEstimation);

        // You can add a margin to the gas estimation if needed
        const gasLimitWithMargin = gasEstimation.mul(2);

        // Send the transaction with the estimated gas limit
        const tx = await contract.add_ABX_liquidity(amount, {
            gasLimit: gasLimitWithMargin.toHexString()
        });

        const receipt = await tx.wait();
        console.log("liquidity", receipt);
    } catch (error) {
        console.error("Error estimating or sending transaction:", error);
    }
  }


  async function exchange(contract) {
    const valueInWei = buyAmount;

    try {
        // Estimate the gas limit for the `ethToAbx` function call
        const gasEstimation = await contract.estimateGas.ethToAbx();

        console.log("Gas Estimation:", gasEstimation);

        // You can add a margin to the gas estimation if needed
        const gasLimitWithMargin = gasEstimation.mul(2);

        // Send the transaction with the estimated gas limit and value in Wei
        const tx = await contract.ethToAbx({ value: valueInWei, gasLimit: gasLimitWithMargin.toHexString() });

        const receipt = await tx.wait();
        console.log("exchange", receipt);
        window.location.reload();
    } catch (error) {
        console.error("Error estimating or sending transaction:", error);
    }
  }



  async function getBalance(contract) {
    try {
        const balance = await contract.balanceOf(address);
        let bal = balance.toString();
        setAbxtoken(bal);
    } catch (error) {
        console.error("Error fetching balance:", error);
    }
  }

  const executeContractWrite = () => {
    let abxContract = createABXContract();
    let abxToEthContract = createABXToEthContract();
    console.log(abxContract);
    console.log(abxToEthContract);
    // approve(abxContract);
    // addLiquidity(abxToEthContract);
    exchange(abxToEthContract);
    // getBalance(abxContract);
  };

  useEffect(() => {
    if (isConnected) {
      let abxContract = createABXContract();
      let abxToEthContract = createABXToEthContract();
      getBalance(abxContract);
    }
  }, [isConnected]);

  return (
    <div className="bg-gradient-to-b from-blue-400 to-blue-600 p-6 rounded-lg shadow-md mx-auto w-64 md:w-96">
      <h2 className="text-3xl font-extrabold mb-4 text-center text-white">Buy Custom ArtBlock Tokens</h2>
      <div className="mb-4">
        <p className="text-center text-gray-200">Your Current ArtBlock Tokens:</p>
        <p className="text-3xl font-extrabold text-center text-white">{abxtoken}</p>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4 text-center">
          <label htmlFor="buyAmount" className="block text-sm font-semibold text-gray-200">
            Enter Amount in Wei:
          </label>
          <div className="relative rounded-md shadow-sm inline-block">
            <input
              type="number"
              id="buyAmount"
              name="buyAmount"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-24 sm:w-32 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter amount"
              value={buyAmount}
              onChange={(e) => setBuyAmount(Number(e.target.value))}
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500">Wei</span>
          </div>
        </div>
        <div className="text-center">
          <button
            className="bg-blue-500 hover-bg-blue-600 text-white py-2 px-4 rounded-md text-lg font-semibold"
            onClick={executeContractWrite}
          >
            Exchange With ArtBlock Tokens
          </button>
        </div>
      </form>
    </div>
  );
};
