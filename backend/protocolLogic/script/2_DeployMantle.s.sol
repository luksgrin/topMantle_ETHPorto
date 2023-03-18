// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/LSSVMPairEnumerableETH.sol";
import "../src/LSSVMPairMissingEnumerableETH.sol";
import "../src/LSSVMPairEnumerableERC20.sol";
import "../src/LSSVMPairMissingEnumerableERC20.sol";
import "../src/LSSVMPairFactory.sol";
import "../src/LSSVMRouter.sol";
import "../src/bonding-curves/ExponentialCurve.sol";
import "../src/bonding-curves/LinearCurve.sol";

import "../src/test_tokens/ERC20_BITUSD.sol";
import "../src/test_tokens/NFT.sol";


contract DeployLocal is Script {
    
    address owner = 0x55a7B5A459098192a401Fed2fC334F740CD306E9; // la-o-llave


    function run() external {

        uint256 deployerPrivateKey = vm.envUint("LA_O_LLAVE");
        vm.startBroadcast(deployerPrivateKey);

        /// DEPLOY POOL
        address payable PROTOCOL_FEE_RECIPIENT = payable(owner);
        uint256 PROTOCOL_FEE_MULTIPLIER = 2;
        


        // LSSVMPairEnumerableETH pairenumerableeth = new LSSVMPairEnumerableETH();
        // console.log("---> LSSVMPairEnumerableETH deployed at: ", address(pairenumerableeth));
        
        // LSSVMPairMissingEnumerableETH pairmissingenumerableeth = new LSSVMPairMissingEnumerableETH();
        // console.log("---> LSSVMPairMissingEnumerableETH deployed at: ", address(pairmissingenumerableeth));


        // LSSVMPairEnumerableERC20 pairenumerableerc20 = new LSSVMPairEnumerableERC20();
        // console.log("---> LSSVMPairEnumerableERC20 deployed at: ", address(pairenumerableerc20));

        
        // LSSVMPairMissingEnumerableERC20 pairmissingenumerableerc20 = new LSSVMPairMissingEnumerableERC20();
        // console.log("---> LSSVMPairMissingEnumerableERC20 deployed at: ", address(pairmissingenumerableerc20));

        // LSSVMPairEnumerableETH pairenumerableeth = LSSVMPairEnumerableETH(payable(0xCFe0e4255366c8DCb862c713c4076Cc79B04faB7));
        // LSSVMPairMissingEnumerableETH pairmissingenumerableeth = LSSVMPairMissingEnumerableETH(payable(0xD1ADD8906500FA133d81C5b641F66Fa893C83F14));
        // LSSVMPairEnumerableERC20 pairenumerableerc20 = LSSVMPairEnumerableERC20(0x478E65C49ADE0952e5838bE86F1DC1c1aC275157);
        // LSSVMPairMissingEnumerableERC20 pairmissingenumerableerc20 = LSSVMPairMissingEnumerableERC20(0x172A56100ED404284338F5c38E874F109ff80a3D);


        // console.log("Deploying factory... LSSVMPairFactory(pairenumerableeth, pairmissingenumerableeth, pairenumerableerc20, pairmissingenumerableerc20, PROTOCOL_FEE_RECIPIENT, PROTOCOL_FEE_MULTIPLIER);");
        // LSSVMPairFactory pairfactory = new LSSVMPairFactory(pairenumerableeth, pairmissingenumerableeth, pairenumerableerc20, pairmissingenumerableerc20, PROTOCOL_FEE_RECIPIENT, PROTOCOL_FEE_MULTIPLIER);
        // console.log("---> LSSVMPairFactory deployed at: ", address(pairfactory));

        LSSVMPairFactory pairfactory = LSSVMPairFactory(payable(0x2c2077D29ed1784Ae559E5F5aE527FaE3D9Fa8c3));
        // // LSSVMRouter router = new LSSVMRouter(pairfactory);
        // // console.log("---> Router deployed at :", address(router));
        // LSSVMRouter router = LSSVMRouter(payable(0x556589F7324FB1f3d038c6e1e2A025DB99750d12));

        // pairfactory.setRouterAllowed(router,  true);
        // console.log("Whitelised router in factory...");

        // ExponentialCurve exponentialbondingcurve = new ExponentialCurve();
        // console.log("---> ExponentialCurve deployed at: ", address(exponentialbondingcurve));

        // LinearCurve linearcurve = new LinearCurve();
        // console.log("---> LinearCurve deployed at: ", address(linearcurve));

        // ExponentialCurve exponentialbondingcurve = ExponentialCurve(0xF0722CDfC7072660F8e3E27761C4D8EDAa1D8105);
        // pairfactory.setBondingCurveAllowed(exponentialbondingcurve, true);
        // console.log("Whitelisted exponential curve in factory...");

        // LinearCurve linearcurve = LinearCurve(0xf5B0F6c228c190E12936167F34Ec1AFd54920105);
        // pairfactory.setBondingCurveAllowed(linearcurve, true);
        // console.log("Whitelisted linear curve in factory...");

        // pairfactory.transferOwnership(owner);
        // console.log("---> Transferred factory ownership to: ", owner);

        
        // DEPLOYMENT DONE, CHECK README
        vm.stopBroadcast();
    }
}