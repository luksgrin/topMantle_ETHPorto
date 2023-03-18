"use strict";
exports.__esModule = true;
var zk_connect_server_1 = require("@sismo-core/zk-connect-server");
var zkConnectConfig = {
    appId: "0xf59ff27a96f8a137ec825dfec8e1cc8e",
    devMode: {
        enabled: true
    }
};
var zkConnect = zk_connect_server_1.ZkConnect(zkConnectConfig);
var ARBITRUM_VOTERS_REQUEST = zk_connect_server_1.DataRequest({ groupId: "0xf59ff27a96f8a137ec825dfec8e1cc8e" });
var vaultId = (yield zkConnect.verify(zkConnectResponse, { dataRequest: ARBITRUM_VOTERS_REQUEST })).vaultId;
//////////////////////////////////////////////////////////////////////////
