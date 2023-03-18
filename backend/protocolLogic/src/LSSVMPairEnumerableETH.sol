pragma solidity ^0.8.0;

import {LSSVMPairETH} from "./LSSVMPairETH.sol";
import {LSSVMPairEnumerable} from "./LSSVMPairEnumerable.sol";
import {ILSSVMPairFactoryLike} from "./ILSSVMPairFactoryLike.sol";

contract LSSVMPairEnumerableETH is LSSVMPairEnumerable, LSSVMPairETH {

    function pairVariant()
        public
        pure
        override
        returns (ILSSVMPairFactoryLike.PairVariant)
    {
        return ILSSVMPairFactoryLike.PairVariant.ENUMERABLE_ETH;
    }
}
