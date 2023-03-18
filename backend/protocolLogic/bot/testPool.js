const ethers = require("ethers");
const fs = require('fs');

const provider = new ethers.providers.JsonRpcProvider();
const signer = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80" ,provider)

const linearcurve_address = "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0";

const factory_address = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
const abi = fs.readFileSync("./abi.json", "utf8");
const factory = new ethers.Contract(factory_address, abi , signer);


const erc20_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const erc20_abi = fs.readFileSync("./erc20_abi.json", "utf8");
const ERC20 = new ethers.Contract(erc20_address, erc20_abi, signer);

const nft_address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const nft_abi = fs.readFileSync("./nft_abi.json", "utf8");
const ERC721 = new ethers.Contract(nft_address, nft_abi, signer); 







async function createPoolPair(){

    var params = {
        token: erc20_address,
        nft: nft_address,
        bondingCurve: linearcurve_address,
        assetRecipient: "0x55a7B5A459098192a401Fed2fC334F740CD306E9", // la-o-llave
        poolType: 0,
        delta: 2,
        fee: 0,
        spotPrice: 10,
        initialNFTIDs: [1],
        initialTokenBalance: 1
    }

    try{

        await ERC20.approve(factory_address, ethers.constants.MaxUint256);
        console.log("approved tokens to factory");

        await ERC721.approve(factory_address, "1");
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



createPoolPair();
    