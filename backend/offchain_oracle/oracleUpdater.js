const { EvmPriceServiceConnection } = require("@pythnetwork/pyth-evm-js");
const { ethers } = require("ethers");
const { readFileSync } = require("fs");
require("dotenv");

const MANTLE_RPC = process.env.TEST_RPC_URL;
const PRIVATE_KEY = process.env.TEST_PRIVATE_KEY;
const masterOracleAddress = "0x64a7B710578A1c68C3B63D836ADDfb9939c80b83";

const mantleProvider = new ethers.providers.JsonRpcProvider(MANTLE_RPC);
const signer = new ethers.Wallet(PRIVATE_KEY, mantleProvider);
const MasterOracle = new ethers.Contract(
    masterOracleAddress,
    readFileSync(
        "MasterOracle_abi.json",
        {encoding:'utf8', flag:'r'}
    ),
    signer
);

const connection = new EvmPriceServiceConnection(
    "https://xc-testnet.pyth.network"
);

const priceIds = [
    // BIT-USD goerli pricefeed
    "0x0e9ec6a3f2fba0a3df73db71c84d736b8fc1970577639c9456a2fee0c8f66d93"
];

async function main() {

    let price = new Number(await MasterOracle.getBITUSDPrice());

    connection.subscribePriceFeedUpdates(priceIds, async (priceFeed) => {

        let response = priceFeed.getPriceNoOlderThan(60);
        console.log(response);
        // mock
        /*let response = {
            price: 690000000000
        }*/

        if (response != null) {
            let newPrice = response.price*10e10; // Natively it has 8 decimals. We extend it to 18 to standarize it
            
            if (newPrice != price) {
                price = newPrice;
                await MasterOracle.updateBITUSDPrice(BigInt(price));
                console.log(
                    `Received update for BIT-USD: ${price}`
                );
            }
        } else {
            console.log(
                `Something went wrong: ${JSON.stringify(response)}`
            );
        }
    });

    setTimeout(() => {
        connection.closeWebSocket();
    }, 60000);
}

main();