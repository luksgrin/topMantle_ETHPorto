import React, { useEffect, useState, Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import VAULT from "../utils/Vault.json";
import logo from "../assets/logo.png"; // relative path to image
const contractAddress = "0xF3FEA28366aB5D98Fb2694b21f127E9a615Fb13E";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// function that listens for smart contract events
const eventListener = async () => {
  const { ethereum } = window;
  try {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, VAULT.abi, signer);
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
  const mantleChainId = "5001";
  if (chainId !== mantleChainId) {
    console.log("You are not connected to the mantleChainId Test Network!");
  }
};

export default function Example(props) {
  const [navigation, setNavigation] = useState([
    { name: "Explore Pool", href: "/pools", current: true },
    { name: "Create Pool", href: "/create-pool", current: false },
    { name: "Monthly Cause", href: "/monthly-cause", current: false },
    { name: "Sismo", href: "/sismo", current: false },
    //   { name: "Calendar", href: "#", current: false },
  ]);

  // Is the wallet connected? metamask injects the "ethereum" object
  const walletConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Please download metamask");
      return;
    } else {
      console.log("Ethereum object found", ethereum);
    }

    // Get chain ID, trhow alert if not connected to Rinkeby
    chainID();

    //If site already connnected to metamask, get user public key
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log(`User account: ${account}`);

      // Setup listener! This is for the case where a user comes to our site
      // and ALREADY had their wallet connected + authorized.
      eventListener();
    } else {
      console.log("Site is not authorized to access metamask");
    }
  };

  // runs when page loads
  useEffect(() => {
    walletConnected();
  }, []);

  const onClickWallet = () => {
    props.onClickWallet();
  };

  const setAmount = () => {
    props.setAmount();
  };

  const redeemETH = () => {
    props.redeemETH();
  };

  const depositETH = () => {
    props.depositETH();
  };
  const renderNotConnectedContainer = () => (
    <button
      onClick={onClickWallet}
      className="cta-button connect-wallet-button"
    >
      Connect Wallet
    </button>
  );
  const renderConnectedContainer = () => (
    <button
      onClick={onClickWallet}
      className="cta-button connect-wallet-button"
    >
      {/* Connected Wallet */}
      {getSlice()}
    </button>
  );

  function getSlice() {
    if (currentAccount != null)
      return currentAccount.slice(0, 4) + "" + currentAccount.slice(-4);
    else return "Connected Wallet";
  }

  const handleClick = (index) => {
    const updatedNavigation = navigation.map((item, i) =>
      i === index ? { ...item, current: true } : { ...item, current: false }
    );
    setNavigation(updatedNavigation);
  };

  var currentAccount = props.currentAccount;
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 NavContainer">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="NavMenu flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src={logo}
                      alt="TopMantle"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src={logo}
                      alt="TopMantle"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block NavTabs">
                  <div className="flex space-x-4">
                    {navigation.map((item, index) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        onClick={() => handleClick(index)}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {
                currentAccount === ""
                  ? renderNotConnectedContainer()
                  : renderConnectedContainer()
                // (
                //   <>
                //     generic text
                //     <input
                //       className="user-input"
                //       type="text"
                //       placeholder="enter amount"
                //       onChange={(event) => setAmount(event.target.value)}
                //     />
                //     <br />
                //     <button
                //       onClick={redeemETH}
                //       className="cta-button withdraw-button"
                //     >
                //       Withdraw ETH
                //     </button>
                //     <button
                //       onClick={depositETH}
                //       className="cta-button deposit-button"
                //     >
                //       Deposit ETH
                //     </button>
                //   </>
                // )
              }
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
