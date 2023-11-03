// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC721 {
    function transferFrom(address _from, address _to, uint _nftId) external;
}

import "./ERC20Factory.sol";

contract MultiAuction {
    uint private constant DURATION = 7 days;
    ERC20 public community_token;
    struct DutchAuction {
        IERC721 nft;
        uint nftid;
        address payable  seller;
        uint startingPrice;
        uint startAt;
        uint expiresAt;
        uint discountRate;
    }

    DutchAuction[] public auctions;

    constructor(address _community_token){
        community_token = ERC20(_community_token);
    }

    function getNativeTokenAddress() public view returns (address){
        return address(community_token);
    }

    function createAuction(uint256 _startingPrice, uint256 _discountRate, address _nft_token, uint256 _nftid) public returns (uint256){
        auctions.push(DutchAuction({
            nft: IERC721(_nft_token),
            nftid: _nftid,
            seller: payable(msg.sender),
            startingPrice: _startingPrice,
            startAt: block.timestamp,
            expiresAt: block.timestamp + DURATION,
            discountRate: _discountRate
        }));
        return auctions.length-1;
    }

    function getCurrentPrice(uint256 auctionId) public view returns (uint256){
        uint timeElapsed = block.timestamp - auctions[auctionId].startAt;
        uint discount = auctions[auctionId].discountRate * timeElapsed;
        return auctions[auctionId].startingPrice - discount;
    }

    function buy(uint256 auctionId, uint256 amount) external {
        require(block.timestamp < auctions[auctionId].expiresAt, "auction expired");

        uint price = getCurrentPrice(auctionId);
        require(amount >= price, "ETH < price");

        auctions[auctionId].nft.transferFrom(auctions[auctionId].seller, msg.sender, auctions[auctionId].nftid);
        uint refund = amount - price;
        if (refund > 0) {
            //payable(msg.sender).transfer(refund);
            community_token.transfer(msg.sender, refund);
        }
        delete auctions[auctionId];
    }

    function getAuctionCount() public view returns (uint256) {
        return auctions.length;
    }
}

