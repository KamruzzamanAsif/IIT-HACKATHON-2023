// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DAO.sol";
import "./ERC20Factory.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DAOFactory {
    address nft_address;
    // Mapping of DAO addresses to their native community tokens
    mapping(address => IERC20) public daoToToken;
    string[] communityNameList;
    address[] communityAddressList;
    address[] communityTokenList;


    // Event emitted when a new DAO is created
    event DAOCreated(address daoAddress, address tokenAddress);
    constructor(address _nft_address){
        nft_address = _nft_address;
    }

    // Creates a new DAO and generates a native community token
    function createDAO(string memory community_name, string memory tokenName,string memory tokenSymbol) external returns (uint256) {
        // Create a new ERC20 token for the DAO
        ERC20 token = new ERC20Factory(1000000, tokenName, tokenSymbol, msg.sender);

        // Create a new DAO contract
        DAO dao = new DAO(community_name, address(token), nft_address);
        communityNameList.push(community_name);
        communityAddressList.push(address(dao));
        communityTokenList.push(address(token));
        // Add the DAO to the mapping
        daoToToken[address(dao)] = token;

        // Emit the DAOCreated event
        emit DAOCreated(address(dao), address(token));

        // Return the DAO address
        return communityNameList.length-1;
    }

    function getAllCommunityNames() public view returns (string[] memory){        
        return communityNameList;
    }

    function getAllCommunityAddress() public view returns (address[] memory){        
        return communityAddressList;
    }

    function getAllTokenList() public view returns (address[] memory){ 
        return communityTokenList;
    }
    
}



/*Interactions:
// Deploy the DAOFactory contract
DAOFactory factory = new DAOFactory();

// Create a new DAO
address daoAddress = factory.createDAO();

// Get the native community token address
address tokenAddress = factory.daoToToken(daoAddress);

// Interact with the DAO using the functions on its contract
DAO dao = DAO(daoAddress);
dao.propose("This is a proposal to do something useful.");
dao.vote(1, true); // Vote in favor of the proposal
dao.execute(1); // Execute the proposal if it has passed

*/
