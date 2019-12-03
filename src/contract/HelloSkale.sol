pragma solidity 0.5.11;

contract HelloSkale {
    string greeting;
    uint256 number;

    constructor() public {
        greeting = "Hello Skale";
        number = 1337;
    }

    function sayHello() public view returns (string memory) {
        return greeting;
    }
    
    function getValue() public view returns (uint256) {
        return number;
    }
    
    function setNumber(uint num) public {
        number = num;
    }
    
    function() external payable {}
    
    function makeWithdrawal() public {
        msg.sender.transfer(address(this).balance);
    }
}

