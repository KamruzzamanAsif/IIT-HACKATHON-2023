import React, {useEffect, useState} from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import DAOFactoryABI from '../../contractInfo/DAOFactory/DAOFactoryABI.json';
import DAOFactoryAddress from '../../contractInfo/DAOFactory/DAOFactoryAddress.json';


export default function CommunityList() {
  const [communityNames, setCommunityNames] = useState([]); // State to store community names
  const [communityAddress, setCommunityAddress] = useState([]); // State

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

  async function fetchCommunityAddresses() {
    try {
      const contract = createDAOFactoryContract();
      console.log(contract);
      const communityAddr = await contract.getAllCommunityAddress();
      console.log(communityAddr);
      // Set the community addresses in the state
      setCommunityAddress(communityAddr);
    } catch (error){
      console.error("Error:", error);
    }
  }

  // Function to map and save as JSON
    function mapAndSaveAsJSON(names, addresses) {
    if (names.length !== addresses.length) {
      console.error('Array lengths do not match.');
      return;
    }

    const mappedData = names.map((name, index) => {
      return {
        name: name,
        address: addresses[index]
      };
    });

    const jsonFileContent = JSON.stringify(mappedData, null, 2);
    
    // Create a Blob containing the JSON data
    const blob = new Blob([jsonFileContent], { type: 'application/json' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a download link and trigger a click event to download the JSON file
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mappedData.json';
    a.click();
  }
  
  useEffect(() => {
    fetchCommunityNames();
    fetchCommunityAddresses();
    // mapAndSaveAsJSON(communityNames, communityAddress);
  }, [])

  return (
  <div className="flex flex-wrap justify-center">
    <div className="w-full text-center">
      <h2 className="text-3xl font-bold mb-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg shadow-lg">
        Communities
      </h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {communityNames.map((communityName, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{communityName}</h2>
          {/* You can add additional information for each community if needed */}
        </div>
      ))}
    </div>
  </div>
);

  
}
