pragma solidity >=0.4.22 <0.8.0;

contract MultisigWallet {

    address[] owners;
    uint requiredSigs;

    constructor(address[] memory _owners, uint _requiredSigs) public {  
	    owners = _owners;
        requiredSigs = _requiredSigs;
    }

    function getOwners() public view returns (address[] memory) {
        return owners;
    }

    function getRequiredSigs() public view returns (uint) {
        return requiredSigs;
    }
}