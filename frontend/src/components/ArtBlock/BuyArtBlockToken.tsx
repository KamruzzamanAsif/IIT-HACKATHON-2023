'client'
import React, { useState } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import EtherToABXABI from '../../contractInfo/EtherToABX/EtherToABXABI.json';
import EtherToABXAddress from '../../contractInfo/EtherToABX/EtherToABXAddress.json';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';

export default function BuyArtBlockToken() {
  const currentUserArtBlockTokens: number = 100;
  const customArtBlockTokenPrice: number = 0.1;
  const approveValue: number = 1000;
  const [buyAmount, setBuyAmount] = useState<number>(0);

  const { address, isConnected, connector } = useAccount({
    async onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected })
    },
  })

  const createEthereumContract = (): ethers.Contract | null => {
    const { ethereum } = window as Window & { ethereum?: any };

    const contractAddress = EtherToABXAddress.contractAddress;
    const contractABI = EtherToABXABI.abi;
    if (typeof ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const transactionsContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      return transactionsContract;
    }
    return null;
  };

  async function result(contract){
    let tx = await contract.add_ABX_liquidity(100); 
    let reciept = await tx.wait()
    console.log(reciept)
  }

  const executeContractWrite = () => {
    let contract = createEthereumContract();
    console.log(contract);
    result(contract);
  };

  return (
    <div className="bg-gradient-to-b from-blue-400 to-blue-600 p-6 rounded-lg shadow-md mx-auto w-64 md:w-96">
      <h2 className="text-3xl font-extrabold mb-4 text-center text-white">Buy Custom ArtBlock Tokens</h2>
      <div className="mb-4">
        <p className="text-center text-gray-200">Your Current ArtBlock Tokens:</p>
        <p className="text-3xl font-extrabold text-center text-white">{currentUserArtBlockTokens}</p>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4 text-center">
          <label htmlFor="buyAmount" className="block text-sm font-semibold text-gray-200">
            Enter Amount in Ether:
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
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500">ETH</span>
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






    // // Call the hooks directly within the component's body
    // const { config } = usePrepareContractWrite({
    //   address: EtherToABXAddress.contractAddress as `0x${string}`,
    //   abi: EtherToABXABI.abi,
    //   functionName: 'approve',
    //   args: [approveValue],
    // });
    // console.log(config);
    // const { data, isLoading, isSuccess, write } = useContractWrite(config);
    // console.log(isSuccess);