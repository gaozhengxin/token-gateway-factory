// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "./AnyCallApp.sol";
import "./IGatewayInfo.sol";

interface IERC1155Gateway is IGatewayInfo {
    function token() external view returns (address);

    function Swapout_no_fallback(
        uint256 tokenId,
        uint256 amount,
        address receiver,
        uint256 toChainID
    ) external payable returns (uint256 swapoutSeq);
}

abstract contract ERC1155Gateway is IERC1155Gateway, AnyCallApp {
    address public token;
    uint256 public swapoutSeq;

    constructor(
        address anyCallProxy,
        uint256 flag,
        address token_
    ) AnyCallApp(anyCallProxy, flag) {
        setAdmin(msg.sender);
        token = token_;
    }

    function _swapout(
        address sender,
        uint256 tokenId,
        uint256 amount
    ) internal virtual returns (bool, bytes memory);

    function _swapin(
        uint256 tokenId,
        uint256 amount,
        address receiver,
        bytes memory extraMsg
    ) internal virtual returns (bool);

    event LogAnySwapOut(
        uint256 tokenId,
        address sender,
        address receiver,
        uint256 toChainID,
        uint256 swapoutSeq
    );

    function Swapout_no_fallback(
        uint256 tokenId,
        uint256 amount,
        address receiver,
        uint256 destChainID
    ) external payable returns (uint256) {
        (bool ok, bytes memory extraMsg) = _swapout(
            msg.sender,
            tokenId,
            amount
        );
        require(ok);
        swapoutSeq++;
        bytes memory data = abi.encode(
            tokenId,
            amount,
            msg.sender,
            receiver,
            swapoutSeq,
            extraMsg
        );
        _anyCall(peer[destChainID], data, address(0), destChainID);
        emit LogAnySwapOut(
            tokenId,
            msg.sender,
            receiver,
            destChainID,
            swapoutSeq
        );
        return swapoutSeq;
    }

    function _anyExecute(uint256 fromChainID, bytes calldata data)
        internal
        override
        returns (bool success, bytes memory result)
    {
        (
            uint256 tokenId,
            uint256 amount,
            ,
            address receiver,
            ,
            bytes memory extraMsg
        ) = abi.decode(
                data,
                (uint256, uint256, address, address, uint256, bytes)
            );
        require(_swapin(tokenId, amount, receiver, extraMsg));
    }
}
