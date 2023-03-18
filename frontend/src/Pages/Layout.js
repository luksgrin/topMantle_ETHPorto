import React from "react";
import Navbar from "./../Components/Navbar2";

const Layout = (props) => {
  const onClickWallet = () => {
    props.onClickWallet();
  };
  return {
    /* Your header content here */
  };
  //   <Navbar onClickWallet={onClickWallet} />
};

export default Layout;
