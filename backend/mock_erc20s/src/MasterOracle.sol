// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.10;

import "openzeppelin-contracts/contracts/access/Ownable.sol";

contract MasterOracle is Ownable {

    uint256 private BITUSD_PRICE;

    event PriceUpdated(uint256 indexed oldPrice, uint256 indexed newPrice, uint256 indexed timestamp);

    constructor(uint256 price) {
        _updatePrice(price);
    }

    function updateBITUSDPrice(uint256 price) external onlyOwner {
        _updatePrice(price);
    }

    function getBITUSDPrice() external view returns(uint256) {
        return BITUSD_PRICE;
    }

    function transferOwnership(address newOwner) view public override onlyOwner {
        revert();
    }

    function _updatePrice(uint256 price) private {
        uint256 oldPrice = BITUSD_PRICE;
        BITUSD_PRICE = price;
        emit PriceUpdated(oldPrice, BITUSD_PRICE, block.timestamp);
    }

}