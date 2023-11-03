import React, {useEffect, useState} from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import DAOFactoryABI from '../../contractInfo/DAOFactory/DAOFactoryABI.json';
import DAOFactoryAddress from '../../contractInfo/DAOFactory/DAOFactoryAddress.json';


export default function CommunityList() {
  const [communityNames, setCommunityNames] = useState([]); // State to store community names

  const { address, isConnected, connector } = useAccount({
  async onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected })
    },
  })

  const createDAOFactoryContract = (): ethers.Contract | null => {
    const { ethereum } = window as Window & { ethereum?: any };

    const contractAddress = DAOFactoryAddress.contractAddress;
    const contractABI = DAOFactoryABI.abi;
    
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
  
  async function fetchCommunityNames() {
    try {
      const contract = createDAOFactoryContract();
      console.log(contract);
  
      const communityList = await contract.getAllCommunityNames();
      console.log(communityList);
      // Set the community names in the state
      setCommunityNames(communityList);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  useEffect(() => {
    fetchCommunityNames();
  }, [])

  return (
    <div className="flex flex-wrap justify-center">
      {communityNames.map((communityName, index) => (
        <div key={index} className="m-4 max-w-md">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{communityName}</h2>
            {/* You can add additional information for each community if needed */}
          </div>
        </div>
      ))}
    </div>
  );
}
