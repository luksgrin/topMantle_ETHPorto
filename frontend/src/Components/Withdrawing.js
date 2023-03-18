import { Button } from "@chakra-ui/button";

import "../styles/App.css";
import twitterLogo from "../assets/twitter-logo.svg";

const TWITTER_HANDLE = "TopMantle";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

// Render when waiting for user to sign and TX to confirm.
const Withdrawing = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Vault tempalte</p>
          <p className="sub-text">description template Aggregator</p>

          <Button
            isLoading
            loadingText="Withdrawing"
            spinnerPlacement="end"
            className="cta-button loading-button"
          ></Button>
        </div>

        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            {`built by @${TWITTER_HANDLE}`}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Withdrawing;
