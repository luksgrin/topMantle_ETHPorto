// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.10;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract MantleMonke is ERC20 {
    uint256 constant _MAX_SUPPLY = 10_000 ether;

    constructor() ERC20("MantleMonke", "MNK") {}

    function mint(uint256 amount) external {
        require(totalSupply() + amount <= _MAX_SUPPLY, "MAX SUPPLY is exceeded");
        address owner = _msgSender();
        _mint(owner, amount);
    }

    function burn(uint256 amount) external {
        address owner = _msgSender();
        _burn(owner, amount);
    }

}