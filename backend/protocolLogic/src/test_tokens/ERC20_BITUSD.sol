// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.10;

//import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "../../lib/solmate/src/tokens/ERC20.sol";

contract ERC20_BITUSD is ERC20 {
    uint constant _MAX_SUPPLY = 100_000_000 ether;

    constructor() ERC20("BITUSD", "BTUSD", 18) {}

    function mint(address _to, uint _amount) external payable {
        _mint(_to, _amount);
    }

    function burn(address _from, uint _amount) external {
        _burn(_from, _amount);
    }

    function _balanceOf(address _addr) external view returns(uint256){
        return balanceOf[_addr];
    }

    

}