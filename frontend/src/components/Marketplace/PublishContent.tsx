import React, { useState, ChangeEvent, FormEvent } from 'react';
import {Web3Storage} from 'web3.storage'

export default function PublishContent() {
  const [contentImage, setContentImage] = useState<File | null>(null);
  const [contentName, setContentName] = useState<string>('');
  const [contentType, setContentType] = useState<string>('');
  const [contentDescription, setContentDescription] = useState<string>('');

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setContentImage(file);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContentName(event.target.value);
  };

  const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContentType(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContentDescription(event.target.value);
  };


  // WEB3 STORAGE CODE
  const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDlBNGQwNDJCMTY3Zjk5NTMxREY3MWViMTA2YzJDOTREZjc5YTg4NTQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTkwMjQ0Mjk2MTQsIm5hbWUiOiJhcnRzIn0.A8itF1rJfI5Y2uvZEaMoTx4AV_s2sLiDPeqxycwSgqY"});
  async function storeFiles (file) {
    const files = [file];
    const cid = await client.put(files);
    console.log('stored files with cid:', cid)
    return cid
  }
   

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // You can handle the form submission here, e.g., sending data to a server.
    storeFiles(contentImage);
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
          <label className="block text-gray-600 text-sm font-semibold mb-2">Content Type</label>
          <input
            type="text"
            value={contentType}
            onChange={handleTypeChange}
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
