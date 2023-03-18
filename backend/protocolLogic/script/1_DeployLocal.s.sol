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


interface IERC20{
    function balanceOf(address) external view returns(uint256);
}

contract DeployLocal is Script {
    
    address owner = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266; // anvil first addr
    /// address owner = address(this); 


    function run() external {

        uint256 deployerPrivateKey = vm.envUint("TEST_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        
        
        /// DEPLOY ERC20 AND ERC721
        ERC20_BITUSD erc20 = new ERC20_BITUSD();
        NFT nft = new NFT("eneefete", "NFT", "google", 10_000, 1 ether);
        
        console.log("ERC20 deployed at: ", address(erc20));
        console.log("NFT deployed at: ", address(nft));

        console.log("sending 100 erc20 to owner");
        erc20.mint(owner, 100);

        uint balance = erc20.balanceOf(owner);
        console.log("---> BALANCE OF OWNER: ", balance);

        console.log("minting 1 NFT to OWNER");
        nft.mintTo{value: 1 ether}(owner);

        uint balanceNft = nft.balanceOf(owner);
        console.log("---> NFT BALANCE OF OWNER: ", balanceNft);

        address ownerof = nft.ownerOf(1);
        console.log("OWNER OF ID 1: ", ownerof);

        

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

        

        vm.stopBroadcast();
    }
}