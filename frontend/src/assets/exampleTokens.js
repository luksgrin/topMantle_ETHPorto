export const erc20TokenMap = {
  USDC: {
    name: "USD Coin",
    symbol: "USDC",
    image: "https://cdn.coinranking.com/B1hm67VRw/usdc.svg",
  },
  USDT: {
    name: "Tether",
    symbol: "USDT",
    image: "https://cdn.coinranking.com/llXEy1K9V/usdt.svg",
  },
  WETH: {
    name: "Wrapped Ether",
    symbol: "WETH",
    image: "https://cdn.coinranking.com/r1OoVQOuM/weth.svg",
  },
  DAI: {
    name: "Dai",
    symbol: "DAI",
    image: "https://cdn.coinranking.com/HJr5I5y5G/dai.svg",
  },
  LINK: {
    name: "Chainlink",
    symbol: "LINK",
    image: "https://cdn.coinranking.com/rkcgDI9_-/link.svg",
  },
};

export const pairCards = [
  {
    image:
      "https://ipfs.io/ipfs/QmTnUoVpU18XsUoYhJoJdwzjMkDqZNEZhC7hNmrjQrJyVr?filename=image.png",
    name: "CryptoPunk #7825",
    date: "March 17, 2023",
    price: "12.5 ETH",
    erc20Token: erc20TokenMap["USDC"].symbol,
    erc20Image: erc20TokenMap["USDC"].image,
    nftId: "7825",
    nftName: "CryptoPunk",
  },
  {
    image:
      "https://ipfs.io/ipfs/QmSggU6RvUzLCCiPrut4GnqEenKwZaTghZpyWVbwm9GZP7?filename=image.png",
    name: "Bored Ape Yacht Club #10317",
    date: "March 18, 2023",
    price: "8.2 ETH",
    erc20Token: erc20TokenMap["WETH"].symbol,
    erc20Image: erc20TokenMap["WETH"].image,
    nftId: "10317",
    nftName: "Bored Ape Yacht Club",
  },
  {
    image:
      "https://ipfs.io/ipfs/QmPzzCu11JttV7E9C9MJ2VgjKfYPcNtJEnuExBbJNh7L5p?filename=image.png",
    name: "Art Blocks Curated #7642",
    date: "March 19, 2023",
    price: "2.1 ETH",
    erc20Token: erc20TokenMap["DAI"].symbol,
    erc20Image: erc20TokenMap["DAI"].image,
    nftId: "7642",
    nftName: "Art Blocks Curated",
  },
];
