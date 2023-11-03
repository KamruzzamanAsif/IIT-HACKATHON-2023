// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EtherToABX {
    IERC20  abx_token;
    uint256 ethToABXExchangeRate = 1000; // 1000 ABX = 1eth

    uint256 etherReserve = 0;
    uint256 ABXReserve = 0;

    constructor(address _abx_token_address){
        abx_token = IERC20(_abx_token_address);
    }

    function add_ABX_liquidity(uint256 abx_amount) public{
//        abx_token.approve(address(this), abx_amount);

        ABXReserve = abx_amount;
        abx_token.transferFrom(msg.sender, address(this), abx_amount);
    }

    function ethToAbx() payable public {
        etherReserve += msg.value;
        uint256 abx_amount_to_exchange = calculateEtherAmount(msg.value);
        abx_token.transfer(msg.sender, abx_amount_to_exchange);
    }

    function calculateEtherAmount(uint256 _abx_amount) internal pure returns (uint256){
        return _abx_amount*2;
    }
    
}
