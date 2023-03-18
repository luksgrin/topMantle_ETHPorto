## Creating A Pair

New pairs for the sudoswap AMM are created with the `LSSVMPairFactory`. LPs will call either `createPairETH` or `createPairERC20` depending on their token type (i.e. if they wish to utilize ETH or an ERC20). This will deploy a new `LSSVMPair` contract.

Each pair has one owner (initially set to be the caller), and multiple pools for the same token and NFT pair can exist, even for the same owner. This is due to each pair having its own potentially different spot price and bonding curve.

## Pair Type

Each pair can be one of 3 types: Token, NFT, or Trade.

A Token pair holds either ETH or an ERC20 token and will give a quote for how much it will pay for any NFT in the collection it has been created for.

An NFT pair holds NFTs and will give a quote for how much it will sell for any NFT it has in its inventory.

A Trade pair holds both NFTs and tokens, and it will give a quote for both buying and selling, with a spread between the quotes as the LP fee.


## Pair Parameters

During the creation call, LPs supply the following parameters:

```
IERC721 _nft, // The ERC721 token side of the pair
ICurve _bondingCurve, // The bonding curve used to price the pair
address payable _assetRecipient, // If set to a non-zero address, assets sent to the pair during a swap will be forwarded to this address. NOTE: unavailable for Trade pairs.
LSSVMPair.PoolType _poolType, // The pair's type (Token, NFT, Trade)
uint256 _delta, // The bonding curve's parameter (more on this in the Bonding Curve section)
uint256 _fee, // The spread between buy and sell quotes. NOTE: only for Trade pairs.
uint256 _spotPrice, // The initial sell quote the pair will return if an NFT is sold into it.
uint256[] calldata _initialNFTIDs // The list of IDs to transfer from the caller to the pair
```

For an ERC20 pair, two other parameters are also added:
```
ERC20 token // The token to be used for the token side of the pair.
uint256 initialTokenBalance // The amount of tokens to send into the pair. (The createPairETH call is payable, and msg.value is used instead)
```

The factory uses a modified minimal proxy pattern to allow deployed pairs to cheaply access certain values the same way that immutable normally works. See LSSVMPairCloner for more technical details.

As a result, several of the above parameters cannot be changed after a pool is deployed:
```
_nft,
_bondingCurve,
_poolType,
token // NOTE: only for ERC20 pairs
```

## Managing A Pair

The owner of a pair can modify certain parameters to change the pair's pricing and inventory.

To modify `spotPrice`, `delta`, and `fee`, the owner can call `changeSpotPrice`, `changeDelta`, and `changeFee` (only for Trade pairs).

To withdraw any NFTs or tokens sent to the pair, the owner can call `withdrawERC721`, `withdrawERC20`, and `withdrawETH` (only for ETH pairs).
