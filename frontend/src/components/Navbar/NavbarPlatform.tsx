import ConnectWallet from "components/Connect/ConnectWallet";
import Link from "next/link";
import React from "react";

export default function NavbarPlatform() {
  return (
    <nav className="bg-gradient-to-b from-gray-100 to-gray-200 p-2 sticky top-0 z-50">
      <div className="mx-auto max-w-8xl px-4 sm:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <a className="flex items-center space-x-2">
                <img
                  className="h-8 w-8 lg:hidden cursor-pointer"
                  src="/logo-iit.png" 
                  alt="IIT logo"
                />
                <img
                  className="hidden h-8 w-8 lg:block cursor-pointer"
                  src="/logo-iit.png"
                  alt="IIT logo"
                />
                <span className="text-xl font-extrabold text-gray-800">ArtBlock</span>
              </a>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/buyArtBlockToken">
              <a className="text-gray-600 hover:text-gray-800 font-extrabold">Buy Tokens</a>
            </Link>
            <Link href="/createCommunity">
              <a className="text-gray-600 hover:text-gray-800 font-extrabold">Create Community</a>
            </Link>
            <Link href="/community">
              <a className="text-gray-600 hover:text-gray-800 font-extrabold">Community</a>
            </Link>
            <Link href="/marketplace">
              <a className="text-gray-600 hover:text-gray-800 font-extrabold">Marketplace</a>
            </Link>
            <ConnectWallet />
          </div>
        </div>
      </div>
    </nav>
  );
}
