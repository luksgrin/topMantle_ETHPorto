import React, { useState } from "react";
import styled from "styled-components";
import PairCard from "./../Components/PairCard"; // assuming PairCard is a component exported from PairCard.js
import styles from "./../styles/index.css";
// import { pairCards } from "../assets/exampleTokens";
import "./Pools.css";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  height: 40px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 20px;
`;

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const erc20TokenMap = {
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

function giveMeIPFS(strImage) {
  const ipfsUrl = "https://gateway.ipfs.io/ipfs/" + strImage;
  return ipfsUrl;
}

const pairCards = [
  {
    image: giveMeIPFS(
      "QmYQJr4MmEMHRSZiSqDAbb1KexWm6PFMDWDPAvA5yUxW1L/capybara1.png"
    ),
    name: "Birthday Capybaras #09117",
    date: "March 17, 2023",
    price: "12.5 WETH",
    erc20Token: erc20TokenMap["USDC"].symbol,
    erc20Image: erc20TokenMap["USDC"].image,
    nftId: "1",
    nftName: "Birthday Capybaras",
  },
  {
    image: giveMeIPFS(
      "QmYQJr4MmEMHRSZiSqDAbb1KexWm6PFMDWDPAvA5yUxW1L/capybara2.png"
    ),
    name: "Birthday Capybaras #06117",
    date: "March 17, 2023",
    price: "12.5 WETH",
    erc20Token: erc20TokenMap["USDC"].symbol,
    erc20Image: erc20TokenMap["USDC"].image,
    nftId: "1",
    nftName: "Birthday Capybaras",
  },
  {
    image: giveMeIPFS(
      "QmYQJr4MmEMHRSZiSqDAbb1KexWm6PFMDWDPAvA5yUxW1L/capybara3.png"
    ),
    name: "Birthday Capybaras #10117",
    date: "March 17, 2023",
    price: "5.5 WETH",
    erc20Token: erc20TokenMap["USDC"].symbol,
    erc20Image: erc20TokenMap["USDC"].image,
    nftId: "1",
    nftName: "Birthday Capybaras",
  },
  {
    image: giveMeIPFS(
      "QmYQJr4MmEMHRSZiSqDAbb1KexWm6PFMDWDPAvA5yUxW1L/capybara4.png"
    ),
    name: "Birthday Capybaras #12117",
    date: "March 17, 2023",
    price: "7.5 WETH",
    erc20Token: erc20TokenMap["USDC"].symbol,
    erc20Image: erc20TokenMap["USDC"].image,
    nftId: "1",
    nftName: "Birthday Capybaras",
  },
  {
    image: giveMeIPFS(
      "QmYQJr4MmEMHRSZiSqDAbb1KexWm6PFMDWDPAvA5yUxW1L/capybara5.png"
    ),
    name: "Birthday Capybaras #15117",
    date: "March 17, 2023",
    price: "2.5 WETH",
    erc20Token: erc20TokenMap["USDC"].symbol,
    erc20Image: erc20TokenMap["USDC"].image,
    nftId: "1",
    nftName: "Birthday Capybaras",
  },
  {
    image: giveMeIPFS(
      "QmeUrPiqwd9DwixUZje34kWUFcBycb1z3E9cvr3Qa2bt28/face1.png"
    ),
    name: "Face of truth #15117",
    date: "March 18, 2023",
    price: "8.2 WETH",
    erc20Token: erc20TokenMap["WETH"].symbol,
    erc20Image: erc20TokenMap["WETH"].image,
    nftId: "10317",
    nftName: "Face of truth",
  },
  {
    image: giveMeIPFS(
      "QmeUrPiqwd9DwixUZje34kWUFcBycb1z3E9cvr3Qa2bt28/face2.png"
    ),
    name: "Face of truth #43317",
    date: "March 18, 2023",
    price: "8.2 WETH",
    erc20Token: erc20TokenMap["WETH"].symbol,
    erc20Image: erc20TokenMap["WETH"].image,
    nftId: "10318",
    nftName: "Face of truth",
  },
  {
    image: giveMeIPFS(
      "QmeUrPiqwd9DwixUZje34kWUFcBycb1z3E9cvr3Qa2bt28/face3.png"
    ),
    name: "Face of truth #10857",
    date: "March 18, 2023",
    price: "8.2 WETH",
    erc20Token: erc20TokenMap["WETH"].symbol,
    erc20Image: erc20TokenMap["WETH"].image,
    nftId: "10319",
    nftName: "Face of truth",
  },
  {
    image: giveMeIPFS(
      "QmeUrPiqwd9DwixUZje34kWUFcBycb1z3E9cvr3Qa2bt28/face4.png"
    ),
    name: "Face of truth #16317",
    date: "March 18, 2023",
    price: "8.2 WETH",
    erc20Token: erc20TokenMap["WETH"].symbol,
    erc20Image: erc20TokenMap["WETH"].image,
    nftId: "10320",
    nftName: "Face of truth",
  },
  {
    image: giveMeIPFS(
      "QmeUrPiqwd9DwixUZje34kWUFcBycb1z3E9cvr3Qa2bt28/face5.png"
    ),
    name: "Face of truth #10217",
    date: "March 18, 2023",
    price: "8.2 WETH",
    erc20Token: erc20TokenMap["WETH"].symbol,
    erc20Image: erc20TokenMap["WETH"].image,
    nftId: "10316",
    nftName: "Face of truth",
  },
  {
    image: giveMeIPFS(
      "Qmc2nUi2xyMrGXUh1egGRNhSvjHARBufc2UDi5gpAabuw5/queen1.png"
    ),
    name: "Queens of damnation #7642",
    date: "March 19, 2023",
    price: "2.1 WETH",
    erc20Token: erc20TokenMap["DAI"].symbol,
    erc20Image: erc20TokenMap["DAI"].image,
    nftId: "7642",
    nftName: "Queens of damnation",
  },
  {
    image: giveMeIPFS(
      "Qmc2nUi2xyMrGXUh1egGRNhSvjHARBufc2UDi5gpAabuw5/queen2.png"
    ),
    name: "Queens of damnation #7112",
    date: "March 19, 2023",
    price: "2.1 WETH",
    erc20Token: erc20TokenMap["DAI"].symbol,
    erc20Image: erc20TokenMap["DAI"].image,
    nftId: "7642",
    nftName: "Queens of damnation",
  },
  {
    image: giveMeIPFS(
      "Qmc2nUi2xyMrGXUh1egGRNhSvjHARBufc2UDi5gpAabuw5/queen3.png"
    ),
    name: "Queens of damnation #7682",
    date: "March 19, 2023",
    price: "2.1 WETH",
    erc20Token: erc20TokenMap["DAI"].symbol,
    erc20Image: erc20TokenMap["DAI"].image,
    nftId: "7642",
    nftName: "Queens of damnation",
  },
  {
    image: giveMeIPFS(
      "Qmc2nUi2xyMrGXUh1egGRNhSvjHARBufc2UDi5gpAabuw5/queen4.png"
    ),
    name: "Queens of damnation #3642",
    date: "March 19, 2023",
    price: "2.1 WETH",
    erc20Token: erc20TokenMap["DAI"].symbol,
    erc20Image: erc20TokenMap["DAI"].image,
    nftId: "7642",
    nftName: "Queens of damnation",
  },
  {
    image: giveMeIPFS(
      "Qmc2nUi2xyMrGXUh1egGRNhSvjHARBufc2UDi5gpAabuw5/queen5.png"
    ),
    name: "Queens of damnation #7142",
    date: "March 19, 2023",
    price: "2.1 WETH",
    erc20Token: erc20TokenMap["DAI"].symbol,
    erc20Image: erc20TokenMap["DAI"].image,
    nftId: "7642",
    nftName: "Queens of damnation",
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  // assuming pairCards is an array of objects representing the data for each PairCard
  //   var _pairCards = pairCards;

  const filteredPairCards = pairCards.filter((pairCard) => {
    console.log(pairCards);
    return (
      ("" + pairCard.image).toLowerCase().includes(searchTerm.toLowerCase()) &&
      ("" + pairCard.name).toLowerCase().includes(searchTerm.toLowerCase()) &&
      ("" + pairCard.date).toLowerCase().includes(searchTerm.toLowerCase()) &&
      ("" + pairCard.price).toLowerCase().includes(searchTerm.toLowerCase()) &&
      ("" + pairCard.erc20Token)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      ("" + pairCard.erc20Image)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      ("" + pairCard.nftId).toLowerCase().includes(searchTerm.toLowerCase()) &&
      ("" + pairCard.nftName).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container className="w-100">
      <SearchContainer className="w-90 SearchContainer">
        <h1>Search your favorite pools / nfts</h1>
        <SearchInput
          className="w-100 Search_Input"
          type="text"
          placeholder="Find your desired pool"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </SearchContainer>

      <CardList className="w-90 CardList">
        {filteredPairCards.map((pairCard, index) => (
          <PairCard className="PairCard" key={index} {...pairCard} />
        ))}
        {/* {filteredPairCards.map((pairCard) => (
          <PairCard
            className="PairCard"
            key={pairCard.id}
            title={pairCard.title}
            description={pairCard.description}
          />
        ))} */}
      </CardList>
    </Container>
  );
}

export default App;
