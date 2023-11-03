// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract ArtBlockCurrency is ERC20, ERC20Permit {
    constructor()
        ERC20("ArtBlockCurrency", "ABX")
        ERC20Permit("ArtBlockCurrency")
    {
        _mint(msg.sender, 10000000 * 10 ** decimals());
    }
}
