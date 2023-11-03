//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.15;

import "hardhat/console.sol";

contract Greeter {
    string private greeting;
    mapping (address => uint256) balances;
    
    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }

      function payMe() external payable {
        require((msg.value>0.1 ether), "This is an error");
        balances[msg.sender] = balances[msg.sender] + msg.value;
    } 
}