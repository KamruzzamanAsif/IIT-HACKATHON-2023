import React from 'react';

export default function CommunityList() {
  const communities = [
    {
      id: 1,
      name: 'Community A',
      description: 'Description for Community A',
    },
    {
      id: 2,
      name: 'Community B',
      description: 'Description for Community B',
    },
    {
      id: 3,
      name: 'Community C',
      description: 'Description for Community C',
    },
    // Add more communities as needed
  ];

  return (
    <div className="flex flex-wrap justify-center">
      {communities.map((community) => (
        <div key={community.id} className="m-4 max-w-md">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{community.name}</h2>
            <p className="text-gray-600">{community.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
