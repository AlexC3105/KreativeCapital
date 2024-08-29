// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KreativeToken is ERC20, Ownable {
    uint256 public constant TOTAL_SUPPLY = 1_000_000 * 10 ** 18;
    uint256 public constant RATE = 100; // 100 KT per 1 ETH

    // Constructor without arguments for Ownable base contract
    constructor() ERC20("KreativeToken", "KT") {
        _mint(msg.sender, TOTAL_SUPPLY);
    }

    function buyTokens() external payable {
        uint256 tokenAmount = msg.value * RATE;
        require(
            balanceOf(owner()) >= tokenAmount,
            "Not enough tokens in the reserve"
        );
        _transfer(owner(), msg.sender, tokenAmount);
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}