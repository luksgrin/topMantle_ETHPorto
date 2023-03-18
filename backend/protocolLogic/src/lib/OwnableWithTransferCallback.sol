pragma solidity ^0.8.4;

import {ERC165Checker} from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import {IOwnershipTransferCallback} from "./IOwnershipTransferCallback.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

abstract contract OwnableWithTransferCallback {
    using ERC165Checker for address;
    using Address for address;

    bytes4 constant TRANSFER_CALLBACK =
        type(IOwnershipTransferCallback).interfaceId;

    error Ownable_NotOwner();
    error Ownable_NewOwnerZeroAddress();

    address private _owner;

    event OwnershipTransferred(address indexed newOwner);

    function __Ownable_init(address initialOwner) internal {
        _owner = initialOwner;
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    modifier onlyOwner() {
        if (owner() != msg.sender) revert Ownable_NotOwner();
        _;
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        if (newOwner == address(0)) revert Ownable_NewOwnerZeroAddress();
        _transferOwnership(newOwner);

        if (newOwner.isContract()) {
            try
                IOwnershipTransferCallback(newOwner).onOwnershipTransfer(msg.sender)
            {} catch (bytes memory) {}
        }
    }

    function _transferOwnership(address newOwner) internal virtual {
        _owner = newOwner;
        emit OwnershipTransferred(newOwner);
    }
}
