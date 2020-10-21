pragma solidity >=0.4.22 <0.8.0;

contract FireCoin {

    string public constant name = "4ireCoin";
    string public constant symbol = "4IRE";
    uint8 public constant decimals = 18;  

    event Transfer(address indexed from, address indexed to, uint tokens);

    mapping(address => uint256) balances;
    uint256 totalSupply_;

    constructor(uint256 total) public {  
	    totalSupply_ = total;
	    balances[msg.sender] = totalSupply_;
    }  

    function totalSupply() public view returns (uint256) {
	    return totalSupply_;
    }
    
    function balanceOf(address tokenOwner) public view returns (uint) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint numTokens) public returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender] - numTokens;
        balances[receiver] = balances[receiver] + numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }
}

