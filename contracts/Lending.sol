// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Lending
{
    struct Lend {
        uint256 duration;
        uint256 APR;
        uint256 amount;
        uint256 yesVote;
        uint256 noVote;
    }

    struct Lock {
        uint256 lockingTime;
        uint256 duration;
        uint256 amount;
    }

    mapping(address => mapping(address => mapping(uint256 => Lend))) lendings;
    mapping(address => mapping(uint256 => Lock)) locks;
    mapping (address => uint256 ) lockCount;

    receive() external payable {
    }

    fallback() external payable {
    }

    function borrow(address contractAddress, uint256 nftId, uint256 duration, uint256 APR, uint256 amount) public {
        Lend memory lend;
        lend.duration = duration;
        lend.APR = APR;
        lend.amount = amount;
        lendings[msg.sender][contractAddress][nftId] = lend;
    }

    function lock(uint256 duration) public payable {
        Lock memory lockElement;
        lockElement.duration = duration;
        lockElement.amount = msg.value;
        lockElement.lockingTime = block.timestamp;
        locks[msg.sender][lockCount[msg.sender]] = lockElement;
        lockCount[msg.sender]++;
    }

    function withdraw(uint256 lockId) public
    {
        Lock memory lockElement = locks[msg.sender][lockId];
        require(block.timestamp - lockElement.lockingTime > lockElement.duration, "Lock is not expired");
        payable(msg.sender).transfer(lockElement.amount);
        delete locks[msg.sender][lockCount[msg.sender]];
        lockCount[msg.sender]--;
    }

    function transferNFT(address from, address to, address contractAddress, uint256 tokenId) public
    {
        ERC721(contractAddress).safeTransferFrom(from, to, tokenId);
    }

    function balanceOf(address owner, address contractAddress) view public returns(uint256)
    {
        return ERC721(contractAddress).balanceOf(owner);
    }

    function ownerOf(address contractAddress, uint256 nftId) view public returns(address)
    {
        address owner = ERC721(contractAddress).ownerOf(nftId);
        return owner;
    }

    function getLend(address owner, address contractAddress, uint256 nftId) view public returns(Lend memory lend) {
        return lendings[owner][contractAddress][nftId];
    }
}
