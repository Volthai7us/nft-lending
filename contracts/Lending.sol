// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Lending
{
    struct Lend {
        uint256 lendId;
        address owner;
        address contractAddress;
        uint256 nftId;
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

    mapping(address => mapping(address => mapping(uint256 => Lend))) public lendings;
    mapping(address => mapping(uint256 => Lock)) public locks;
    mapping (address => uint256 ) public lockCount;
    Lend [] public lends;
    uint256 public lendCount;


    receive() external payable {
    }

    fallback() external payable {
    }

    function borrow(address contractAddress, uint256 nftId, uint256 duration, uint256 APR, uint256 amount) public {
        Lend memory lend;
        lend.lendId = lendCount;
        lend.owner = msg.sender;
        lend.contractAddress = contractAddress;
        lend.nftId = nftId;
        lend.duration = duration;
        lend.APR = APR;
        lend.amount = amount;
        lendings[msg.sender][contractAddress][nftId] = lend;
        lends.push(lend);
        lendCount++;
        //ERC721(contractAddress).safeTransferFrom(msg.sender, address(this), nftId);
    }

    function getBackNft(address contractAddress, uint256 nftId) public {
        Lend memory lend = lendings[msg.sender][contractAddress][nftId];
        require(block.timestamp - lendings[msg.sender][contractAddress][nftId].duration > lend.duration, "Lend is not expired");
        ERC721(contractAddress).safeTransferFrom(address(this), msg.sender, nftId);
        delete lends[lendings[msg.sender][contractAddress][nftId].lendId];
        delete lendings[msg.sender][contractAddress][nftId];
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

    function balanceOf(address owner, address contractAddress) view public returns(uint256)
    {
        return ERC721(contractAddress).balanceOf(owner);
    }

    function ownerOf(address contractAddress, uint256 nftId) view public returns(address)
    {
        address owner = ERC721(contractAddress).ownerOf(nftId);
        return owner;
    }

    function getLend(uint256 id) view public returns(Lend memory) {
        return lends[id];
    }
}
