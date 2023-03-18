import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CreatePool.css";
const PoolPairForm = () => {
  // Define state variables to store form input values
  const [erc20Address, setErc20Address] = useState("");
  const [nftAddress, setNftAddress] = useState("");
  const [linearCurveAddress, setLinearCurveAddress] = useState("");
  const [assetRecipientAddress, setAssetRecipientAddress] = useState("");
  const [poolType, setPoolType] = useState("");
  const [delta, setDelta] = useState("");
  const [fee, setFee] = useState("");
  const [spotPrice, setSpotPrice] = useState("");
  const [initialNFTIDs, setInitialNFTIDs] = useState("");
  const [initialTokenBalance, setInitialTokenBalance] = useState("");
  function createPoolPair(
    erc20Address,
    nftAddress,
    linearCurveAddress,
    assetRecipientAddress,
    poolType,
    delta,
    fee,
    spotPrice,
    initialNFTIDs,
    initialTokenBalance
  ) {
    console.log(
      erc20Address,
      nftAddress,
      linearCurveAddress,
      assetRecipientAddress,
      poolType,
      delta,
      fee,
      spotPrice,
      initialNFTIDs,
      initialTokenBalance
    );
  }

  // Define a function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Call createPoolPair function with form input values
    createPoolPair(
      erc20Address,
      nftAddress,
      linearCurveAddress,
      assetRecipientAddress,
      poolType,
      delta,
      fee,
      spotPrice,
      initialNFTIDs,
      initialTokenBalance
    );

    // Reset form input values
    setErc20Address("");
    setNftAddress("");
    setLinearCurveAddress("");
    setAssetRecipientAddress("");
    setPoolType("");
    setDelta("");
    setFee("");
    setSpotPrice("");
    setInitialNFTIDs("");
    setInitialTokenBalance("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4 GridForm">
        <div className="col-span-4 sm:col-span-2">
          <h1 className="GridForm_Title">Swap Context</h1>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="erc20Address"
            className="block text-sm font-medium text-gray-700"
          >
            ERC20 Address
          </label>
          {/* <select className="border border-gray-300 rounded-md p-2">
           */}

          <select
            placeholder="Set bonding curve for the pool"
            // type="text"
            name="erc20Address"
            id="erc20Address"
            value={erc20Address}
            onChange={(event) => setErc20Address(event.target.value)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="USDC">USDC</option>
            <option value="DAI">DAI</option>
            <option value="WETH">WETH</option>
            <option value="BIT">BIT</option>
            <option value="USDT">USDT</option>
            <option value="custom">Write a custom one</option>
          </select>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="nftAddress"
            className="block text-sm font-medium text-gray-700"
          >
            NFT Address
          </label>
          <input
            type="text"
            name="nftAddress"
            id="nftAddress"
            placeholder="Set NFT address"
            value={nftAddress}
            onChange={(event) => setNftAddress(event.target.value)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="linearCurveAddress"
            className="block text-sm font-medium text-gray-700"
          >
            Linear Curve Address
          </label>
          <select
            // type="text"
            name="linearCurveAddress"
            id="linearCurveAddress"
            placeholder="Set bonding curve for the pool"
            value={linearCurveAddress}
            onChange={(event) => setLinearCurveAddress(event.target.value)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="linear">Linear bonding curve</option>
            <option value="exponential">Exponential bonding curve</option>
            <option value="xyk">Concentrated XYK bonding curve</option>
          </select>
        </div>
        <div
          className="col-span
        2 sm:col-span-1"
        >
          <label
            htmlFor="poolType"
            className="block text-sm font-medium text-gray-700"
          >
            Pool Type
          </label>
          <select
            name="poolType"
            id="poolType"
            value={poolType}
            onChange={(event) => setPoolType(event.target.value)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="">Select a pool type</option>
            <option value="0">Add NFT - Get ERC20</option>
            <option value="1">Add ERC20 - Get NFT</option>
            <option value="2">Add both - Farm fees</option>
          </select>
        </div>

        <div className="col-span-4 sm:col-span-2">
          <h1 className="GridForm_Title">Pool Context</h1>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="delta"
            className="block text-sm font-medium text-gray-700"
          >
            Delta
          </label>
          <input
            type="text"
            name="delta"
            placeholder="Set delta (value that changes up/down on pool changes)"
            id="delta"
            value={delta}
            onChange={(event) => setDelta(event.target.value)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="fee"
            className="block text-sm font-medium text-gray-700"
          >
            Fee
          </label>
          <input
            type="text"
            placeholder="Set fee amount of the pool"
            name="fee"
            id="fee"
            value={fee}
            onChange={(event) => setFee(event.target.value)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="spotPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Spot Price
          </label>
          <input
            type="text"
            name="spotPrice"
            placeholder="Set starting price of the pool"
            id="spotPrice"
            value={spotPrice}
            onChange={(event) => setSpotPrice(event.target.value)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="initialNFTIDs"
            className="block text-sm font-medium text-gray-700"
          >
            Initial NFT IDs
          </label>
          <input
            type="text"
            placeholder="Set IDs of the NFTs"
            name="initialNFTIDs"
            id="initialNFTIDs"
            value={initialNFTIDs}
            onChange={(event) => setInitialNFTIDs(event.target.value)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="initialTokenBalance"
            className="block text-sm font-medium text-gray-700"
          >
            Initial Token Balance
          </label>
          <input
            type="text"
            placeholder="Initial balance of ERC20 token"
            name="initialTokenBalance"
            id="initialTokenBalance"
            value={initialTokenBalance}
            onChange={(event) => setInitialTokenBalance(event.target.value)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="ml-auto mr-auto mt-2 btn btn-primary inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring focus:ring-indigo-300 disabled:opacity-50"
            disabled={
              !erc20Address || !nftAddress || !linearCurveAddress || !poolType
            }
          >
            Create Pool Pair
          </button>
        </div>
      </div>
    </form>
  );
};

export default PoolPairForm;
