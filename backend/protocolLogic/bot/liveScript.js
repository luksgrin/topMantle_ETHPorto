const ethers = require("ethers");
const fs = require('fs');

/**
 * @VARIABLE_DECLARATIONS
 */

const provider = new ethers.providers.JsonRpcProvider("https://rpc.testnet.mantle.xyz/");
const linearcurve_address = "0xf5b0f6c228c190e12936167f34ec1afd54920105";
const factory_address = "0x2c2077d29ed1784ae559e5f5ae527fae3d9fa8c3";
const abi = fs.readFileSync("./abi.json", "utf8"); // abi has not changed, so can use the one generated during compilation
const factory = new ethers.Contract(factory_address, abi , signer);


/**
 *  User supplied parameters via the Front End
 * @param {*} erc20_address 
 * @param {*} nft_address 
 * @param {*} linearcurve_address 
 * @param {*} assetRecipient_address 
 * @param {*} poolType_uint8 
 * @param {*} delta_uint128 
 * @param {*} fee_uint96 
 * @param {*} spotPrice_uint128 
 * @param {*} initialNFTIDs_uint256_array 
 * @param {*} initialTokenBalance_uint256
 * @param {*} signer
 */
async function createPoolPair(erc20_address, nft_address, linearcurve_address, 
    assetRecipient_address, poolType_uint8, delta_uint128, fee_uint96, spotPrice_uint128, 
    initialNFTIDs_uint256_array, initialTokenBalance_uint256, signer
    ){

    var params = {
        token: erc20_address,
        nft: nft_address,
        bondingCurve: linearcurve_address,
        assetRecipient: assetRecipient_address,
        poolType: poolType_uint8, 
        delta: delta_uint128,
        fee: fee_uint96,
        spotPrice: spotPrice_uint128,
        initialNFTIDs: initialNFTIDs_uint256_array,
        initialTokenBalance: initialTokenBalance_uint256
    }

        /**
         * @MantleMonke (MNK) ERC20
         */
        const _erc20_address = erc20_address;
        const erc20_abi = [
            "function mint(uint256) external",
            "function balanceOf(address) external view returns(uint256)",
            "function approve(address,uint256) external returns(bool)"
        ]
        const ERC20 = new ethers.Contract(_erc20_address, erc20_abi, signer);


        /**
         * @FacesOfTruth (FCSFTRTH) ERC721
         */
        const _nft_address = nft_address;
        const nft_abi = [
            "function approve(address,uint256) external",
            "function balanceOf(address) external view returns(uint256)"
        ];
        const ERC721 = new ethers.Contract(_nft_address, nft_abi, signer); 


    try{

        tx = await ERC20.approve(factory_address, ethers.constants.MaxUint256);
        await tx.wait()
        console.log("approved tokens to factory");

        tx = await ERC721.approve(factory_address, "2");
        await tx.wait()
        console.log("approved NFT to factory");

        console.log("creating pair with the following parameters: ")
        console.log(params)
        let tx3 = await factory.createPairERC20(params)
        let receipt3 = await tx3.wait();
        
        let pair_address = receipt3.events[2].data;
        console.log(`--> Pair Address deployed at: ${pair_address}`);

    } catch(e){
        console.log("an error occ: ", e)
    }
}



createPoolPair(erc20_address, nft_address, linearcurve_address, 
    assetRecipient_address, poolType_uint8, delta_uint128, fee_uint96, spotPrice_uint128, 
    initialNFTIDs_uint256_array, initialTokenBalance_uint256, signer
);
    