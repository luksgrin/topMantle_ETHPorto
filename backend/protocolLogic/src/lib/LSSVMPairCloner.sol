pragma solidity ^0.8.0;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import {ERC20} from "solmate/tokens/ERC20.sol";

import {ICurve} from "../bonding-curves/ICurve.sol";
import {ILSSVMPairFactoryLike} from "../ILSSVMPairFactoryLike.sol";

library LSSVMPairCloner {

    function cloneETHPair(
        address implementation,
        ILSSVMPairFactoryLike factory,
        ICurve bondingCurve,
        IERC721 nft,
        uint8 poolType
    ) internal returns (address instance) {
        assembly {
            let ptr := mload(0x40)
            mstore(
                ptr,
                hex"60_72_3d_81_60_09_3d_39_f3_3d_3d_3d_3d_36_3d_3d_37_60_3d_60_35_36_39_36_60_3d_01_3d_73_00_00_00"
            )
            mstore(add(ptr, 0x1d), shl(0x60, implementation))
            mstore(
                add(ptr, 0x31),
                hex"5a_f4_3d_3d_93_80_3e_60_33_57_fd_5b_f3_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00"
            )
            mstore(add(ptr, 0x3e), shl(0x60, factory))
            mstore(add(ptr, 0x52), shl(0x60, bondingCurve))
            mstore(add(ptr, 0x66), shl(0x60, nft))
            mstore8(add(ptr, 0x7a), poolType)

            instance := create(0, ptr, 0x7b)
        }
    }

    function cloneERC20Pair(
        address implementation,
        ILSSVMPairFactoryLike factory,
        ICurve bondingCurve,
        IERC721 nft,
        uint8 poolType,
        ERC20 token
    ) internal returns (address instance) {
        assembly {
            let ptr := mload(0x40)
            mstore(
                ptr,
                hex"60_86_3d_81_60_09_3d_39_f3_3d_3d_3d_3d_36_3d_3d_37_60_51_60_35_36_39_36_60_51_01_3d_73_00_00_00"
            )
            mstore(add(ptr, 0x1d), shl(0x60, implementation))
            mstore(
                add(ptr, 0x31),
                hex"5a_f4_3d_3d_93_80_3e_60_33_57_fd_5b_f3_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00"
            )
            mstore(add(ptr, 0x3e), shl(0x60, factory))
            mstore(add(ptr, 0x52), shl(0x60, bondingCurve))
            mstore(add(ptr, 0x66), shl(0x60, nft))
            mstore8(add(ptr, 0x7a), poolType)
            mstore(add(ptr, 0x7b), shl(0x60, token))

            instance := create(0, ptr, 0x8f)
        }
    }

    function isETHPairClone(
        address factory,
        address implementation,
        address query
    ) internal view returns (bool result) {
        assembly {
            let ptr := mload(0x40)
            mstore(
                ptr,
                hex"3d_3d_3d_3d_36_3d_3d_37_60_3d_60_35_36_39_36_60_3d_01_3d_73_00_00_00_00_00_00_00_00_00_00_00_00"
            )
            mstore(add(ptr, 0x14), shl(0x60, implementation))
            mstore(
                add(ptr, 0x28),
                hex"5a_f4_3d_3d_93_80_3e_60_33_57_fd_5b_f3_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00"
            )
            mstore(add(ptr, 0x35), shl(0x60, factory))

            // compare expected bytecode with that of the queried contract
            let other := add(ptr, 0x49)
            extcodecopy(query, other, 0, 0x49)
            result := and(
                eq(mload(ptr), mload(other)),
                and(
                    eq(mload(add(ptr, 0x20)), mload(add(other, 0x20))),
                    eq(mload(add(ptr, 0x29)), mload(add(other, 0x29)))
                )
            )
        }
    }
    function isERC20PairClone(
        address factory,
        address implementation,
        address query
    ) internal view returns (bool result) {

        assembly {
            let ptr := mload(0x40)
            mstore(
                ptr,
                hex"3d_3d_3d_3d_36_3d_3d_37_60_51_60_35_36_39_36_60_51_01_3d_73_00_00_00_00_00_00_00_00_00_00_00_00"
            )
            mstore(add(ptr, 0x14), shl(0x60, implementation))
            mstore(
                add(ptr, 0x28),
                hex"5a_f4_3d_3d_93_80_3e_60_33_57_fd_5b_f3_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00"
            )
            mstore(add(ptr, 0x35), shl(0x60, factory))

            let other := add(ptr, 0x49)
            extcodecopy(query, other, 0, 0x49)
            result := and(
                eq(mload(ptr), mload(other)),
                and(
                    eq(mload(add(ptr, 0x20)), mload(add(other, 0x20))),
                    eq(mload(add(ptr, 0x29)), mload(add(other, 0x29)))
                )
            )
        }
    }
}
