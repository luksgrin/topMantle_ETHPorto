// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.10;

import "../../lib/solmate/src/tokens/ERC721.sol";


contract NFT is ERC721 {

    error MintPriceNotPaid();
    error MaxSupply();
    error NonExistentTokenURI();
    error WithdrawTransfer();

    string public baseURI;
    uint256 public currentTokenId;
    uint256 public immutable TOTAL_SUPPLY; // For example 10_000
    uint256 public immutable MINT_PRICE; // For example 0.08 ether

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseURI,
        uint256 _total_supply,
        uint256 _mint_price
    ) ERC721(_name, _symbol) {
        TOTAL_SUPPLY = _total_supply;
        MINT_PRICE = _mint_price;
        baseURI = _baseURI;
    }

    function mintTo(address recipient) public payable returns (uint256) {
        if (msg.value != MINT_PRICE) {
            revert MintPriceNotPaid();
        }
        uint256 newTokenId = ++currentTokenId;
        if (newTokenId > TOTAL_SUPPLY) {
            revert MaxSupply();
        }
        _safeMint(recipient, newTokenId);
        return newTokenId;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        if (ownerOf(tokenId) == address(0)) {
            revert NonExistentTokenURI();
        }
        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId))
                : "";
    }

    function withdrawPayments(address payable payee) external {
        uint256 balance = address(this).balance;
        (bool transferTx, ) = payee.call{value: balance}("");
        if (!transferTx) {
            revert WithdrawTransfer();
        }
    }
}