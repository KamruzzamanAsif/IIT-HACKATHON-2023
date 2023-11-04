import React, { useState, useEffect } from "react";

export default function Auction() {
  const [artworks, setArtworks] = useState([
    {
        id: 1,
        name: "Eagle",
        price: "600 Token",
        imageUrl: "/art-5.jpg",
    },
    {
        id: 2,
        name: "Banana",
        price: "100 Token",
        imageUrl: "/art-6.jpg",
     },
    // Add more artworks as needed
  ]);

  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [newBid, setNewBid] = useState(0);

  const handleBid = () => {
    if (selectedArtwork && newBid > selectedArtwork.price.toInt()) {
      // Update the artwork price to the new bid amount
      const updatedArtworks = artworks.map((artwork) => {
        if (artwork.id === selectedArtwork.id) {
          return { ...artwork, price: newBid.toString() };
        }
        return artwork;
      });
      setArtworks(updatedArtworks);
      // Reset the bid input
      setNewBid(0);
    }
  };

  useEffect(() => {
    // Select the first artwork by default
    if (artworks.length > 0) {
      setSelectedArtwork(artworks[0]);
    }
  }, [artworks]);

  return (
    <div className="p-4">
      <h2 className="text-center text-3xl font-bold mb-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg shadow-lg">
        Art Auction
      </h2>

      <div className="flex">
        <div className="w-1/2">
          <h3 className="text-xl font-bold mb-2">Available Artworks</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {artworks.map((artwork) => (
              <div
                key={artwork.id}
                className="border border-gray-200 p-4 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedArtwork(artwork)}
              >
                <img src={artwork.imageUrl} alt={artwork.name} className="w-full h-48 object-cover rounded-lg" />
                <div className="mt-4">
                  <h4 className="text-lg font-semibold">{artwork.name}</h4>
                  <p className="text-gray-500">Current Price: {artwork.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2">
          <h3 className="text-xl font-bold mb-2">Bidding Section</h3>
          {selectedArtwork && (
            <div className="border border-gray-200 p-4 rounded-lg">
              <img src={selectedArtwork.imageUrl} alt={selectedArtwork.name} className="w-full h-48 object-cover rounded-lg" />
              <h4 className="text-lg font-semibold">{selectedArtwork.name}</h4>
              <p className="text-gray-500">Current Price: {selectedArtwork.price}</p>
              <div className="mt-4">
                <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700">
                  Your Bid:
                </label>
                <input
                  type="number"
                  id="bidAmount"
                  name="bidAmount"
                  value={newBid}
                  onChange={(e) => setNewBid(Number(e.target.value))}
                  className="mt-1 p-2 border rounded-lg"
                />
              </div>
              <div className="mt-4">
                <button
                  onClick={handleBid}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Place Bid
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
