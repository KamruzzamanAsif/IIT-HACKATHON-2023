import React, { useState } from "react";
import mappedData from '../../contractInfo/mappedData.json'
import DAOABI from '../../contractInfo/DAO/DAOABI.json'
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';

export default function Artworks() {
  // Sample array of pending artwork objects
  const pendingArtworks = [
    {
      name: "Icchu",
      price: "20 Token",
      imageUrl: "/art-1.jpg",
    },
    {
      name: "Fun Park",
      price: "50 Token",
      imageUrl: "/art-2.jpg",
    },
    {
      name: "Fun Park",
      price: "40 Token",
      imageUrl: "/art-3.jpg",
    },
    {
      name: "Fun Park",
      price: "50 Token",
      imageUrl: "/art-4.jpg",
    },
    {
      name: "Fun Park",
      price: "60 Token",
      imageUrl: "/art-5.jpg",
    },
    {
      name: "Fun Park",
      price: "100 Token",
      imageUrl: "/art-6.jpg",
    },
  ];

  // Sample array of artworks for sale
  const artworksForSale = [
    {
      name: "Dark",
      price: "20 Token",
      imageUrl: "/art-7.jpg",
    },
    {
      name: "Rock",
      price: "30 Token",
      imageUrl: "/Avatar-2.png",
    },
    {
      name: "Girl",
      price: "100 Token",
      imageUrl: "/Avatar.png",
    },
  ];

  const [votes, setVotes] = useState(pendingArtworks.map(() => 0));


  const { address, isConnected, connector } = useAccount({
    async onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected })
    },
  })

  function getDAOAddress(contentCommunity){
    const matchingCommunity = mappedData.find((community) => community.name === contentCommunity);

    if (matchingCommunity) {
      return matchingCommunity.address;
    } else {
      return "Community not found";
    }
  }

  const createDAOContract = (DAOAddress): ethers.Contract | null => {
    const { ethereum } = window as Window & { ethereum?: any };

    const contractAddress = DAOAddress;
    const contractABI = DAOABI.abi;
    
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

  const handleUpVote = async (index) => {
    const DAOAddress = getDAOAddress("ABC");
    let daoAddress = "0xbbf18a5bf9d2a7131a1408b2006277e19c0d62d3";
    const DAOContract = createDAOContract(daoAddress);

    console.log(DAOContract);

    const id = 1;
    const flag:boolean = true;
    try {
        // Estimate the gas limit for the `vote` function call
        const gasEstimation = await DAOContract.estimateGas.vote(id, flag);

        console.log("Gas Estimation:", gasEstimation);

        // You can add a margin to the gas estimation if needed
        const gasLimitWithMargin = gasEstimation.mul(2);

        // Send the transaction with the estimated gas limit
        const tx = await DAOContract.vote(id, flag, {
            gasLimit: gasLimitWithMargin.toHexString()
        });

        await tx.wait(); // Wait for the transaction to be mined

        const newVotes = [...votes];
        newVotes[index] += 1;
        setVotes(newVotes);
    } catch (error) {
        console.error("Error estimating or sending transaction:", error);
    }
  };


  const handleDownVote = (index) => {
    const newVotes = [...votes];
    newVotes[index] -= 1;
    setVotes(newVotes);
  };

  return (
    <div>
      <div className="mb-4 text-center p-4">
      <h2 className="text-center text-3xl font-bold mb-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg shadow-lg">
        Pending Artworks
      </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pendingArtworks.map((artwork, index) => (
          <div key={index} className="border border-gray-200 p-4 rounded-lg">
            <img src={artwork.imageUrl} alt={artwork.name} className="w-full h-48 object-cover rounded-lg" />
            <div className="mt-4">
              <h3 className="text-lg font-semibold">{artwork.name}</h3>
              <p className="text-gray-500">{artwork.price}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => handleUpVote(index)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Up Vote ({votes[index]})
              </button>
              <button
                onClick={() => handleDownVote(index)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Down Vote
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-center text-3xl font-bold mb-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg shadow-lg">
        On Sale! Hurry UP!
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {artworksForSale.map((artwork, index) => (
          <div key={index} className="border border-gray-200 p-4 rounded-lg">
            <img src={artwork.imageUrl} alt={artwork.name} className="w-full h-48 object-cover rounded-lg" />
            <div className="mt-4">
              <h3 className="text-lg font-semibold">{artwork.name}</h3>
              <p className="text-gray-500">{artwork.price}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => alert(`You have purchased ${artwork.name} for ${artwork.price}`)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
