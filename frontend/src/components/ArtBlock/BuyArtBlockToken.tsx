import React, { useState } from 'react';

const BuyArtBlockToken: React.FC = () => {
  // Replace these placeholders with actual values from your application state
  const currentUserArtBlockTokens = 100;
  const customArtBlockTokenPrice = 0.1;

  const [buyAmount, setBuyAmount] = useState(0);

  // Function to handle buying ArtBlockTokens
  const handleBuyTokens = () => {
    // Implement your buying logic here
    // This could involve interacting with a smart contract
    // and MetaMask integration, but that's beyond the scope of this example.
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
            Amount to Buy:
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
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500">Tokens</span>
          </div>
        </div>
        <div className="mb-6 text-center">
          <p className="text-gray-200">Total Cost:</p>
          <p className="text-3xl font-extrabold text-white">{(buyAmount * customArtBlockTokenPrice).toFixed(2)} ETH</p>
        </div>
        <div className="text-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-lg font-semibold"
            onClick={handleBuyTokens}
          >
            Buy Custom ArtBlock Tokens
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuyArtBlockToken;
