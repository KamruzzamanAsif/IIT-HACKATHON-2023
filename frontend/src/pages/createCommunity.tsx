import React, { useState, ChangeEvent, FormEvent } from 'react';
import NavbarPlatform from 'components/Navbar/NavbarPlatform';

export default function CreateCommunity() {
  const [communityName, setCommunityName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleCommunityNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCommunityName(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // You can handle the form submission here, e.g., sending data to a server.
    console.log('Community Name:', communityName);
    console.log('Description:', description);
  };

  return (
    <>
       <div>
        <NavbarPlatform/>
    </div>
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Create a Community</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Community Name</label>
          <input
            type="text"
            value={communityName}
            onChange={handleCommunityNameChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Description</label>
          <textarea
            value={description}
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
            Create Community
          </button>
        </div>
      </form>
    </div>
    </>
  );
}
