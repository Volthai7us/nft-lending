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
        uint256 deadline;
        uint256 requestTime;
        uint256 APR;
        uint256 amount;
        uint256 yesVote;
        uint256 noVote;
        bool isBorrowed;
    }

    struct Lock {
        uint256 lockId;
        address owner;
        uint256 deadline;
        uint256 duration;
        uint256 amount;
    }

    //lend
    mapping(uint256 => Lend) public lends;
    uint256 public lendCount = 0;

    //lock
    mapping(uint256 => Lock) public locks;
    uint256 public lockCount = 0;
    mapping(uint256 => uint256) public durationToApr;

    //dao
    mapping(address => bool) public daoMembers;
    mapping(address => mapping(uint256 => bool)) public daoVotes;

    constructor() {
        daoMembers[msg.sender] = true;
        durationToApr[1 days] = 10;
        durationToApr[7 days] = 20;
        durationToApr[30 days] = 30;
    }

    receive() external payable {
    }

    fallback() external payable {
    }

    function BorrowRequest(address nftContractAddress, uint256 nftId, uint256 duration, uint256 apr, uint256 amount) public 
    {
        Lend memory lend = Lend(lendCount, msg.sender, nftContractAddress, nftId, duration, block.timestamp + duration, block.timestamp, apr, amount, 0, 0, false);
        lends[lendCount] = lend;
        lendCount++;
    }

    function Borrow(uint256 lendId) public
    {
        Lend memory lend = lends[lendId];
        require(lend.owner != address(0), "Lend does not exist");
        require(lend.owner == msg.sender, "You are not owner.");
        require(block.timestamp - lend.requestTime > 1 days, "Vote is not over.");
        require(lend.yesVote > lend.noVote, "Vote is not passed.");
        require(ERC721(lend.contractAddress).ownerOf(lend.nftId) == address(this), "You must send NFT to this contract.");

        payable(lend.owner).transfer(lend.amount);
        lend.deadline = block.timestamp + lend.duration;
        lend.isBorrowed = true;
        lends[lendId] = lend;
    }

    function WithdrawNft(uint256 lendId) public payable
    {
        Lend memory lend = lends[lendId];
        require(lend.owner != address(0), "Lend does not exist");
        require(lend.deadline > block.timestamp, "Lend time is expired.");
        require(lend.owner == msg.sender, "You are not owner.");
        require(msg.value > lend.amount + lend.amount * lend.APR / 100, "You should pay more.");

        ERC721 nft = ERC721(lend.contractAddress);
        nft.transferFrom(address(this), lend.owner, lend.nftId);
    }

    

    // Lock Eth functions

    function LockEth(uint256 duration) public payable {
        require(durationToApr[duration] != 0, "Duration is not valid.");
        Lock memory lock = Lock(lockCount, msg.sender, block.timestamp + duration, duration, msg.value);
        locks[lockCount] = lock;
        lockCount++;
    }

    function WithdrawEth(uint256 lockId) public {
        Lock memory lock = locks[lockId];
        require(lock.owner != address(0), "Lock does not exist");
        require(lock.deadline < block.timestamp, "Lock time is not expired.");
        require(lock.owner == msg.sender, "You are not owner.");
        payable(lock.owner).transfer(lock.amount * durationToApr[lock.duration] / 100 + lock.amount);
    }



    //DAO functions

    function AddMember(address member) public
    {
        require(daoMembers[msg.sender], "You are not dao member.");
        daoMembers[member] = true;
    }

    function RemoveMember(address member) public
    {
        require(daoMembers[msg.sender], "You are not dao member.");
        daoMembers[member] = false;
    }

    function Vote(uint256 lendId, bool vote) public
    {
        Lend memory lend = lends[lendId];
        require(lend.owner != address(0), "Borrow request does not exist.");
        require(lend.owner != msg.sender, 'You cannot vote for your own request.');
        require(block.timestamp - lend.requestTime < 1 days, "Vote is over.");
        require(daoMembers[msg.sender], "You are not dao member.");
        require(!daoVotes[msg.sender][lendId], "You already voted.");

        if (vote)
        {
            lend.yesVote++;
        }
        else
        {
            lend.noVote++;
        }

        daoVotes[msg.sender][lendId] = true;

        lends[lendId] = lend;
    }


    // View functions

    function GetLend(uint256 lendId) public view returns (Lend memory)
    {
        return lends[lendId];
    }

    function GetLendCount() public view returns (uint256)
    {
        return lendCount;
    }

    function GetMember(address member) public view returns (bool)
    {
        return daoMembers[member];
    }

    function GetBalance() public view returns (uint256)
    {
        return address(this).balance;
    }

    function IsVoteOver(uint256 lendId) public view returns (bool)
    {
        Lend memory lend = lends[lendId];
        return block.timestamp - lend.requestTime > 1 days;
    }

    function GetLock(uint256 lockId) public view returns (Lock memory)
    {
        return locks[lockId];
    }
}
