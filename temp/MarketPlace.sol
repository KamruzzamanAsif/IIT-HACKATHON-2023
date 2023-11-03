// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ArtNFT";

contract MarketPlace {
    ArtNFT nft_token;
    ERC20 native_token;

    struct Product {
        address owner;
        uint256 price;
    }

    mapping(uint256=>Product) products_on_sale; //nftid=>Product
    Product[] products;

    constructor(address _native_token, address _nft_token){
        nft_token = _nft_token;
        native_token = _native_token;
    }

    function upload_new_product(uint256 nftid,  uint256 price){
        products_on_sale[nftid] = Product({
            owner: msg.sender,
            price: price
        });
        native_token.transferFrom(msg.sender, address(this), price);
        products.push(Product({
            owner: msg.sender,
            price: price
        }));
    }
    function buy(uint256 nftid) {
        // First, approve the marketplace contract to transfer the NFT on behalf of the owner
        nft_token.approve(address(this), nftid);

        // Transfer the native token from the buyer to the seller
        native_token.transferFrom(msg.sender, products_on_sale[nftid].owner, products_on_sale[nftid].price);

        // Transfer the NFT from the seller to the buyer
        nft_token.safeTransferFrom(products_on_sale[nftid].owner, msg.sender, nftid);
    }


    function getAllProductsOnSale(){

    }


}
