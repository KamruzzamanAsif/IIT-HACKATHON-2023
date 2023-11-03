import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract DAO {
    // The native community token of the DAO
    string community_name;
    IERC20 public token;

    struct proposal {
        uint256 pid;
        address proposer;
        string name;
        string description;
        uint256 upvote;
        uint256 downvote;
        uint256 abxAmountLocked;
        uint256 startTime;
        uint256 endTime;
        address[] voters;
        uint32 genreCode;
    }

    proposal[] proposes;

    // Constructor
    constructor(string memory _community_name, address token_address) {
        community_name = _community_name;
        token = ERC20(token_address);
    }


    // Function to propose a new action to the DAO
    function propose(string memory name, string calldata description, uint256 abxAmountLocked, uint256 endTime, uint32 genreCode) external returns (uint256){
        uint256 pid = proposes.length;
        proposes.push(proposal({
            pid: pid,
            proposer: msg.sender,
            name: name, 
            description: description,
            upvote: 0,
            downvote: 0,
            abxAmountLocked: abxAmountLocked,
            startTime: block.timestamp,
            endTime: endTime,
            voters: new address[](0),
            genreCode: genreCode
        }));

        token.transferFrom(msg.sender, address(this), abxAmountLocked);
        return pid;
    }

    function vote(uint256 proposalId, bool approve) external {
        uint256 tokenOwned = token.balanceOf(msg.sender);

        if(approve) proposes[proposalId].upvote += tokenOwned;
        else proposes[proposalId].downvote += tokenOwned;
        proposes[proposalId].voters.push(msg.sender);
    }

    // Function to execute a passed proposal
    function execute(uint256 proposalId) external {
        if(proposes[proposalId].upvote > proposes[proposalId].downvote){
            // mint as nft
            if(proposes[proposalId].genreCode == 1){ // 1 == Exclusive
            // send to Auction
            }
            else if(proposes[proposalId].genreCode == 2){ // normal
                // send to Timeline
            }
        } 
    }
}

