import React, { useState } from "react";
import "./Selector.css";

const defaultTokens = [
  {
    symbol: "USDC",
    name: "USD Coin",
    image:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389",
  },
  {
    symbol: "USDT",
    name: "Tether",
    image:
      "https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707",
  },
  {
    symbol: "DAI",
    name: "Dai",
    image:
      "https://assets.coingecko.com/coins/images/9956/small/dai-multi-collateral-mcd.png?1574218774",
  },
  {
    symbol: "WETH",
    name: "Wrapped Ether",
    image:
      "https://assets.coingecko.com/coins/images/2518/small/weth.png?1628852295",
  },
  {
    symbol: "BIT",
    name: "Bit",
    image:
      "https://assets.coingecko.com/coins/images/20125/small/Bit.png?1624270755",
  },
  {
    symbol: "TEST",
    name: "Test Token",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/12/Testcard_F.jpg",
  },
];

const Selector = () => {
  const [token1, setToken1] = useState(defaultTokens[0]);
  const [token2, setToken2] = useState(null);
  const [isSwapped, setIsSwapped] = useState(false);
  const [tokenAddress, setTokenAddress] = useState("");
  const [customToken, setCustomToken] = useState(null);

  const options = [
    ...defaultTokens,
    customToken && {
      symbol: customToken.symbol,
      name: customToken.name,
      image: customToken.image || "https://via.placeholder.com/50x50",
    },
  ].filter(Boolean);

  const handleToken1Change = (e) => {
    const selectedToken = JSON.parse(e.target.value);
    if (selectedToken.symbol === token2?.symbol) {
      setToken2(token1);
    }
    setToken1(selectedToken);
  };

  const handleToken2Change = (e) => {
    const selectedToken = JSON.parse(e.target.value);
    if (selectedToken.symbol === token1.symbol) {
      setToken1(token2);
    }
    setToken2(selectedToken);
  };

  const handleSwap = () => {
    setIsSwapped(!isSwapped);
    setToken1(token2);
    setToken2(token1);
  };

  const handleCustomToken = () => {
    setCustomToken({
      symbol: tokenAddress,
      name: tokenAddress,
      image: "https://via.placeholder.com/50x50",
    });
    setTokenAddress("");
  };

  return (
    <div className="selector-container">
      <div className="selector">
        <div className="selector-title">
          {isSwapped ? "Receive" : "Deposit"}
        </div>
        <div className="selector-content">
          <div className="selector-dropdown">
            <select
              value={JSON.stringify(token1)}
              onChange={handleToken1Change}
            >
              {options.map((token, index) => (
                <option key={index} value={JSON.stringify(token)}>
                  {token.symbol} - {token.name}
                </option>
              ))}
            </select>
          </div>
          <div className="selector-icon">
            <img
              src={
                isSwapped
                  ? token2?.image || "https://via.placeholder.com/50x50"
                  : token1?.image || "https://via.placeholder.com/50x50"
              }
              alt=""
            />
          </div>
          <div className="selector-dropdown">
            <select
              value={JSON.stringify(token2)}
              onChange={handleToken2Change}
            >
              {options.map((token, index) => (
                <option key={index} value={JSON.stringify(token)}>
                  {token.symbol} - {token.name}
                </option>
              ))}
            </select>
          </div>
          <div
            className="selector-icon selector-icon-swap"
            onClick={handleSwap}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Double-headed_arrow_white.svg/1200px-Double-headed_arrow_white.svg.png"
              alt="Swap"
            />
          </div>
        </div>
        <div className="selector-custom-token">
          <input
            type="text"
            placeholder="Enter token address"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
          />
          <button onClick={handleCustomToken}>Add Custom Token</button>
        </div>
      </div>
    </div>
  );
};

export default Selector;
