import React, { useState } from "react";
import styled from "styled-components";
import "./PairCard.css";

const Container = styled.div`
  position: relative;
  width: 250px;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  margin: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Details = styled.div`
  padding: 20px;
`;

const Name = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-bottom: 10px;
`;

const Erc20Image = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 10px;
`;

const BuyNow = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #ff9900;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    background-color: #ffa600;
    transform: translateY(0px);
  }
`;

const LightningIcon = styled.span`
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    height: 20px;
    fill: #ff9900;
  }
`;

function PairCard({
  image,
  name,
  date,
  price,
  erc20Token,
  erc20Image,
  nftId,
  nftName,
}) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  nftName = nftName ? nftName : "";
  nftId = nftId ? nftId : "";
  var NFTName = nftName + "#" + nftId;
  var NFTDate = date ? date : "";
  var TokenImage = erc20Image;
  var TokenName = erc20Token;
  var TokenAmount = price;

  return (
    <Container
      className="overflow-hidden rounded-lg shadow-lg PairCardPool"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image className="block h-auto w-full" src={image} alt={name} />

      <header class="flex items-center justify-between leading-tight p-2 md:p-4">
        <h1 class="text-lg">
          <a class="no-underline hover:underline text-black">{NFTName}</a>
        </h1>
        <p class="text-grey-darker text-sm">{NFTDate}</p>
      </header>

      <footer class="flex items-center justify-between leading-none p-2 md:p-4">
        <a
          class="flex items-center no-underline hover:underline text-black"
          href="#"
        >
          <img
            alt="Placeholder"
            class="block rounded-full erc20_token"
            src={TokenImage}
          />
          <p class="ml-2 text-sm m-0">Floor {TokenAmount}</p>
        </a>
      </footer>
      {isHovering && (
        <BuyNow className="PairCardBuyContainer">
          <LightningIcon className="PairCardBuyIcon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M7 2v11h3v9l7-12h-4l4-8z" />
            </svg>
          </LightningIcon>
          Buy it now
        </BuyNow>
      )}
    </Container>
  );
}

export default PairCard;
