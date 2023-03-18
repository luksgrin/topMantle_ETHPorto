import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import VAULT from "./utils/Vault.json";
import "./styles/App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import arrow from "./assets/arrow.svg";
import Loading from "./Components/Loading";
import Withdrawing from "./Components/Withdrawing";
import VaultInformation from "./Components/VaultInformation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar2";
import Footer from "./Components/Footer";
// import Navbar from "./../Components/Navbar2";
import HomePage from "./Pages/Pools";
import CreatePool from "./Pages/CreatePool2";
import MonthlyCause from "./Pages/MonthlyCause";
import PoolList from "./Pages/Pools";
import SismoTest from "./Pages/SismoTest";
import styles from "./styles/index.css";
import "./styles/General.css";

// Constants
const contractAddress = "somecooladd"; //@audit TODO
const TWITTER_HANDLE = "TopMantle";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isWithdrawing, setWithdrawing] = useState(false);
  const [isReceipt, setReceipt] = useState("");
  const [amount, setAmount] = useState("");
  const [maxUserBalance, setMaxUserBalance] = useState("");

  // Function to connect site to the metamask wallet
  const connectWallet = async () => {
    const { ethereum } = window;
    try {
      if (!ethereum) {
        alert("Please download metamask!");
        return;
      }
      // Connect to metamask wallet
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(`connected: ${accounts[0]}`);
      setCurrentAccount(accounts[0]);
      eventListener();
    } catch (e) {
      console.log(e);
    }
  };

  // function that listens for smart contract events
  const eventListener = async () => {
    const { ethereum } = window;
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          VAULT.abi,
          signer
        );
        // webhook, listening for smart contract events
        const event_name = "deposit";
        contract.on(event_name, (from, amount) => {
          console.log(`From: ${from} , amount: ${amount}`);
          var hash = amount.toNumber();
          //setHash(id)
        });
      }
      console.log("Setup event listener!");
    } catch (e) {
      console.log(e);
    }
  };

  // Get user's current chain ID
  const chainID = async () => {
    const { ethereum } = window;
    let chainId = await ethereum.request({ method: "eth_chainId" });
    console.log("Connected to chain " + chainId);
    // String, hex code of the chainId of the Rinkebey test network
    const rinkebyChainId = "0x4";
    if (chainId !== rinkebyChainId) {
      // alert("You are not connected to the Rinkeby Test Network!");
    }
  };

  // Deposit ETH in VAULT and get tx hash
  const depositETH = async () => {
    const { ethereum } = window;
    try {
      if (ethereum) {
        chainID();
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          VAULT.abi,
          signer
        );

        // pop wallet to pay gas. Parse user input into ETH and deposit
        var deposit_eth = ethers.utils.parseEther(amount).toString();
        let tx = await contract.depositETH({ value: deposit_eth });
        setLoading(true);

        await tx.wait();

        console.log(
          `Transaction mined at https://rinkeby.etherscan.io/tx/${tx.hash}`
        );
        const hash = tx.hash;

        setReceipt(hash);
        setLoading(false);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  // Redeem ETH from VAULT + rewards and get tx hash
  const redeemETH = async () => {
    const { ethereum } = window;
    try {
      if (ethereum) {
        chainID();
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          VAULT.abi,
          signer
        );

        // pop wallet to pay gas. Parse user input into ETH and withdraw @param not payable
        var withdraw_eth = ethers.utils.parseEther(amount).toString();
        let tx = await contract.redeem(withdraw_eth);
        setWithdrawing(true);

        await tx.wait();
        console.log(
          `Transaction mined at https://rinkeby.etherscan.io/tx/${tx.hash}`
        );
        const hash = tx.hash;

        setReceipt(hash);
        setWithdrawing(false);
      }

      setWithdrawing(false);
    } catch (e) {
      setWithdrawing(false);
      console.log(e);
    }
  };

  // Render Methods
  const renderNotConnectedContainer = () => (
    <button
      onClick={connectWallet}
      className="cta-button connect-wallet-button"
    >
      Connect Wallet
    </button>
  );

  // when user is depositing funds and waiting for TX to pass:
  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  return (
    <Router>
      <Navbar
        pageTitle="TopMantle"
        onClickWallet={connectWallet}
        connected={currentAccount}
        setAmount={setAmount}
        redeemETH={redeemETH}
        depositETH={depositETH}
      />
      <div class="from-primary to-secondary text-primary-content -mt-[4rem] grid place-items-center items-end bg-gradient-to-br pt-20 hero-image-main">
        <div class="hero-content col-start-1 row-start-1 w-full max-w-7xl flex-col justify-between gap-10 pb-20 lg:flex-row lg:items-end lg:gap-0 xl:gap-20">
          <div class="lg:px-10 lg:pb-12">
            {/* <h1 class="font-title mb-2 py-4 font-extrabold lg:py-10"> */}
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>

            <Routes>
              <Route path="/pools" element={<HomePage />} />
            </Routes>
            {/* <Layout pageTitle="Create Pool"> */}
            <Routes>
              <Route path="/create-pool" element={<CreatePool />} />
            </Routes>
            {/* </Layout> */}
            {/* <Layout pageTitle="Pool List"> */}
            <Routes>
              <Route path="/pool-list" element={<PoolList />} />
            </Routes>
            {/* </Layout> */}
            {/* <Layout pageTitle="Monthly Cause"> */}
            <Routes>
              <Route path="/monthly-cause" element={<MonthlyCause />} />
            </Routes>
            <Routes>
              <Route path="/sismo" element={<SismoTest />} />
            </Routes>
            {/* </Layout> */}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
