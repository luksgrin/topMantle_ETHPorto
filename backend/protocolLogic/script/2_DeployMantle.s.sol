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


contract DeployLocal is Script {
    
    address owner = 0x55a7B5A459098192a401Fed2fC334F740CD306E9; // la-o-llave


    function run() external {

        uint256 deployerPrivateKey = vm.envUint("LA_O_LLAVE");
        vm.startBroadcast(deployerPrivateKey);

        /// DEPLOY POOL
        address payable PROTOCOL_FEE_RECIPIENT = payable(owner);
        uint256 PROTOCOL_FEE_MULTIPLIER = 2;
        

        LSSVMPairEnumerableETH pairenumerableeth = new LSSVMPairEnumerableETH();
        console.log("---> LSSVMPairEnumerableETH deployed at: ", address(pairenumerableeth));
        
        LSSVMPairMissingEnumerableETH pairmissingenumerableeth = new LSSVMPairMissingEnumerableETH();
        console.log("---> LSSVMPairMissingEnumerableETH deployed at: ", address(pairmissingenumerableeth));

        LSSVMPairEnumerableERC20 pairenumerableerc20 = new LSSVMPairEnumerableERC20();
        console.log("---> LSSVMPairEnumerableERC20 deployed at: ", address(pairenumerableerc20));

        LSSVMPairMissingEnumerableERC20 pairmissingenumerableerc20 = new LSSVMPairMissingEnumerableERC20();
        console.log("---> LSSVMPairMissingEnumerableERC20 deployed at: ", address(pairmissingenumerableerc20));

        console.log("Deploying factory... LSSVMPairFactory(pairenumerableeth, pairmissingenumerableeth, pairenumerableerc20, pairmissingenumerableerc20, PROTOCOL_FEE_RECIPIENT, PROTOCOL_FEE_MULTIPLIER);");
        LSSVMPairFactory pairfactory = new LSSVMPairFactory(pairenumerableeth, pairmissingenumerableeth, pairenumerableerc20, pairmissingenumerableerc20, PROTOCOL_FEE_RECIPIENT, PROTOCOL_FEE_MULTIPLIER);
        console.log("---> LSSVMPairFactory deployed at: ", address(pairfactory));
    
        LSSVMRouter router = new LSSVMRouter(pairfactory);
        console.log("---> Router deployed at :", address(router));

        pairfactory.setRouterAllowed(router,  true);
        console.log("Whitelised router in factory...");

        ExponentialCurve exponentialbondingcurve = new ExponentialCurve();
        console.log("---> ExponentialCurve deployed at: ", address(exponentialbondingcurve));

        LinearCurve linearcurve = new LinearCurve();
        console.log("---> LinearCurve deployed at: ", address(linearcurve));

        pairfactory.setBondingCurveAllowed(exponentialbondingcurve, true);
        console.log("Whitelisted exponential curve in factory...");

        pairfactory.setBondingCurveAllowed(linearcurve, true);
        console.log("Whitelisted linear curve in factory...");

        pairfactory.transferOwnership(owner);
        console.log("---> Transferred factory ownership to: ", owner);

        
        // DEPLOYMENT DONE, CHECK README for addresses
        vm.stopBroadcast();
    }
}