import React from "react";
import {
  ZkConnectButton,
  ZkConnectClientConfig,
  ZkConnectResponse,
} from "@sismo-core/zk-connect-react";

const config: ZkConnectClientConfig = {
  appId: "0x7a2e84236d2942361366b5337408fb57", // Arbitrum voters
  devMode: {
    enabled: true, // will use the Dev Sismo Data Vault https://dev.vault-beta.sismo.io/
    devAddresses: [
      // Will insert these addresses in data groups as eligible addresses
      "0x42FA0505Cca6cEcBc566d6036BdA5C55a9a4dDd1",
      "0x55a7B5A459098192a401Fed2fC334F740CD306E9",
    ],
  },
};

const SismoTest = () => {
  return (
    <div>
      <h1>Sismo Verification</h1>
      {/* <SismoButton></SismoButton> */}
      <ZkConnectButton
        config={config}
        // Declare your dataRequest for the-merge-contributor group
        dataRequest={{
          groupId: "0xf59ff27a96f8a137ec825dfec8e1cc8e",
        }}
        // get a response
        onResponse={async (zkConnectResponse: ZkConnectResponse) => {
          //Send the response to your server to verify it
          //thanks to the @sismo-core/zk-connect-server package
          //Will see how to do this in next part of this tutorial
        }}
      />
    </div>
  );
};

export default SismoTest;
