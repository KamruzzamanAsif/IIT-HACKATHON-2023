// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AMM {
    IERC20 public tokenA;
    IERC20 public tokenB;
    uint256 public reserveA;
    uint256 public reserveB;

    event Swap(address indexed user, uint256 amountIn, uint256 amountOut);

    constructor(IERC20 _tokenA, IERC20 _tokenB) {
        tokenA = _tokenA;
        tokenB = _tokenB;
    }

    function addLiquidity(uint256 amountA, uint256 amountB) external {
        require(amountA > 0 && amountB > 0, "Amount must be greater than zero");

        reserveA += amountA;
        reserveB += amountB;

        require(
            tokenA.transferFrom(msg.sender, address(this), amountA),
            "Transfer of tokenA failed"
        );
        require(
            tokenB.transferFrom(msg.sender, address(this), amountB),
            "Transfer of tokenB failed"
        );
    }

    function swap(uint256 amountIn, bool forA) external {
        require(amountIn > 0, "Amount must be greater than zero");

        uint256 reserveIn = forA ? reserveA : reserveB;
        uint256 reserveOut = forA ? reserveB : reserveA;

        uint256 amountOut = (amountIn * reserveOut) / (reserveIn + amountIn);

        require(
            forA
                ? tokenA.transferFrom(msg.sender, address(this), amountIn)
                : tokenB.transferFrom(msg.sender, address(this), amountIn),
            "Transfer of tokenIn failed"
        );

        require(
            forA
                ? tokenB.transfer(msg.sender, amountOut)
                : tokenA.transfer(msg.sender, amountOut),
            "Transfer of tokenOut failed"
        );

        if (forA) {
            reserveA += amountIn;
            reserveB -= amountOut;
        } else {
            reserveB += amountIn;
            reserveA -= amountOut;
        }

        emit Swap(msg.sender, amountIn, amountOut);
    }
}
