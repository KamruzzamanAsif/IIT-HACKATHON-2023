import React, { useState, ChangeEvent, FormEvent } from 'react';
import {Web3Storage} from 'web3.storage'
import mappedData from '../../contractInfo/mappedData.json'
import DAOABI from '../../contractInfo/DAO/DAOABI.json'
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';

export default function PublishContent() {
  const [contentImage, setContentImage] = useState<File | null>(null);
  const [contentName, setContentName] = useState<string>('');
  const [contentType, setContentType] = useState<string>('');
  const [contentPrice, setContentPrice] = useState<Number>(0);
  const [contentDescription, setContentDescription] = useState<string>('');
  const [contentCommunity, setContentCommunity] = useState<string>('');

  const { address, isConnected, connector } = useAccount({
    async onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected })
    },
  })

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setContentImage(file);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContentName(event.target.value);
  };

  const handleTypeChange = (e) => {
    setContentType(e.target.value);
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContentPrice(Number(event.target.value));
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContentDescription(event.target.value);
  };

  const handleCommunityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContentCommunity(event.target.value);
  };

  // WEB3 STORAGE CODE
  const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDlBNGQwNDJCMTY3Zjk5NTMxREY3MWViMTA2YzJDOTREZjc5YTg4NTQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTkwMjQ0Mjk2MTQsIm5hbWUiOiJhcnRzIn0.A8itF1rJfI5Y2uvZEaMoTx4AV_s2sLiDPeqxycwSgqY"});
  async function storeFiles (file) {
    const files = [file];
    const cid = await client.put(files);
    console.log('stored files with cid:', cid)
    return cid
  }
   
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

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // You can handle the form submission here, e.g., sending data to a server.
    const contentCid = storeFiles(contentImage);

    const DAOAddress = getDAOAddress(contentCommunity);
    
    const DAOContract = createDAOContract(DAOAddress);
    console.log(DAOContract);

    DAOContract.propose(contentName, contentDescription, contentCid, contentPrice, 10, 1);

    console.log('Content Image:', contentImage);
    console.log('Content Name:', contentName);
    console.log('Content Type:', contentType);
    console.log('Content Description:', contentDescription);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Publish Content</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Content Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Content Name</label>
          <input
            type="text"
            value={contentName}
            onChange={handleNameChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
      <label className="block text-gray-600 text-sm font-semibold mb-2">
        Content Type
      </label>
      <select
        value={contentType}
        onChange={handleTypeChange}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        required
      >
        <option value="General">General</option>
        <option value="Exclusive">Exclusive</option>
      </select>
    </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Content Price</label>
          <input
            type="number"
            value={contentPrice.toString()}
            onChange={handlePriceChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Community Name</label>
          <input
            type="text"
            value={contentCommunity}
            onChange={handleCommunityChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Content Description</label>
          <textarea
            value={contentDescription}
            onChange={handleDescriptionChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            rows={4}
            required
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring"
          >
            Publish Content
          </button>
        </div>
      </form>
    </div>
  );
}
