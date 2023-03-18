import {
  ZkConnect,
  ZkConnectServerConfig,
  DataRequest,
} from "@sismo-core/zk-connect-server";

const zkConnectConfig: ZkConnectServerConfig = {
  appId: "0xf59ff27a96f8a137ec825dfec8e1cc8e",
  devMode: {
    enabled: true,
  },
};
const zkConnect = ZkConnect(zkConnectConfig);

const ARBITRUM_VOTERS_REQUEST = DataRequest({
  groupId: "0xf59ff27a96f8a137ec825dfec8e1cc8e",
});

const { vaultId } = await zkConnect.verify(zkConnectResponse, {
  dataRequest: ARBITRUM_VOTERS_REQUEST,
});
//////////////////////////////////////////////////////////////////////////

import {
  ZkConnect,
  ZkConnectServerConfig,
  DataRequest,
} from "@sismo-core/zk-connect-server";

const zkConnectConfig: ZkConnectServerConfig = {
  appId: "0xf59ff27a96f8a137ec825dfec8e1cc8e",
};
const zkConnect = ZkConnect(zkConnectConfig);
