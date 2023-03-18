// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.10;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "./MasterOracle.sol";

contract BITUSD is ERC20 {
    uint256 constant _MAX_SUPPLY = 100_000_000 ether;
    MasterOracle immutable MASTER_ORACLE;

    constructor(address _oracle) ERC20("BITUSD", "BTUSD") {
        MASTER_ORACLE = MasterOracle(_oracle);
    }

    function mint() external payable {
        address owner = _msgSender();
        uint256 amount = MASTER_ORACLE.getBITUSDPrice()*msg.value/(1 ether);
        require(totalSupply() + amount <= _MAX_SUPPLY, "MAX SUPPLY is exceeded");
        _mint(owner, amount);
    }

    function burn(uint256 _amount) external {
        address owner = payable(_msgSender());
        uint256 amount = _amount*(1 ether)/MASTER_ORACLE.getBITUSDPrice();
        _burn(owner, _amount);
        (bool sent,) = owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
    // add fallback and receive lmfaaao
}