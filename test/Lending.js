const { expect } = require('chai')
const { ethers, waffle } = require('hardhat')

describe('Lending', () => {
    let nft, lending, deployer, addr1, addr2

    beforeEach(async () => {
        const accounts = await ethers.getSigners()
        deployer = accounts[0]
        addr1 = accounts[1]
        addr2 = accounts[2]
        const Lending = await ethers.getContractFactory('Lending')
        const NFT = await ethers.getContractFactory('ERC721PresetMinterPauserAutoId')
        lending = await Lending.deploy()
        nft = await NFT.deploy('My NFT', 'NFT', 'https://my-json-server.typicode.com/abcoathup/samplenft/tokens/')
        await deployer.sendTransaction({ to: lending.address, value: ethers.utils.parseEther('10') })
    })

    describe('Lending', () => {
        it('Send borrow request', async () => {
            await nft.mint(addr1.address)
            await lending.connect(addr1).BorrowRequest(nft.address, 0, 30000, 20, 3)
            const borrowRequest = await lending.GetLend(0)
            expect(borrowRequest.owner).to.equal(addr1.address)
        })

        it('Send borrow request then wait for approval', async () => {
            await nft.mint(addr1.address)
            await lending.connect(addr1).BorrowRequest(nft.address, 0, 30000, 20, 3)
            await lending.AddMember(addr2.address)
            await lending.connect(addr2).Vote(0, true)
            const borrowRequest = await lending.GetLend(0)
            expect(borrowRequest.yesVote).to.equal(1)
        })

        it("Cannot borrow if nft didn't sent to contract", async () => {
            await nft.mint(addr1.address)
            lending.connect(addr1).BorrowRequest(nft.address, 0, 30000, 20, 3)
            await lending.AddMember(addr2.address)
            await lending.connect(addr2).Vote(0, true)
            await ethers.provider.send('evm_increaseTime', [86400])
            await ethers.provider.send('evm_mine')

            await expect(lending.connect(addr1).Borrow(0)).to.be.revertedWith('You must send NFT to this contract.')
        })

        it('Cannot borrow if vote is not over.', async () => {
            await nft.mint(addr1.address)
            lending.connect(addr1).BorrowRequest(nft.address, 0, 30000, 20, 3)
            await lending.AddMember(addr2.address)
            await lending.connect(addr2).Vote(0, true)
            await expect(lending.connect(addr1).Borrow(0)).to.be.revertedWith('Vote is not over.')
        })

        it('Borrow Request, Send Nft, Borrow', async () => {
            await nft.mint(addr1.address)
            await lending.connect(addr1).BorrowRequest(nft.address, 0, 30000, 20, 3)
            await lending.AddMember(addr2.address)
            await lending.connect(addr2).Vote(0, true)
            await ethers.provider.send('evm_increaseTime', [86400])
            await ethers.provider.send('evm_mine')
            await nft.connect(addr1).transferFrom(addr1.address, lending.address, 0)
            await lending.connect(addr1).Borrow(0)
            const borrowRequest = await lending.GetLend(0)
            expect(borrowRequest.isBorrowed).to.equal(true)
        })

        it('Borrow Request, Send Nft, Borrow, WithdrawNFT with unsufficent eth', async () => {
            await nft.mint(addr1.address)
            await lending.connect(addr1).BorrowRequest(nft.address, 0, 30000, 20, 3)
            await lending.AddMember(addr2.address)
            await lending.connect(addr2).Vote(0, true)
            await ethers.provider.send('evm_increaseTime', [86400])
            await ethers.provider.send('evm_mine')
            await nft.connect(addr1).transferFrom(addr1.address, lending.address, 0)
            await lending.connect(addr1).Borrow(0)
            await expect(lending.connect(addr1).WithdrawNft(0)).to.be.revertedWith('You should pay more.')
        })

        it('Borrow Request, Send Nft, Borrow, WithdrawNFT after deadline', async () => {
            await nft.mint(addr1.address)
            await lending.connect(addr1).BorrowRequest(nft.address, 0, 30000, 20, 3)
            await lending.AddMember(addr2.address)
            await lending.connect(addr2).Vote(0, true)
            await ethers.provider.send('evm_increaseTime', [86400])
            await ethers.provider.send('evm_mine')
            await nft.connect(addr1).transferFrom(addr1.address, lending.address, 0)
            await lending.connect(addr1).Borrow(0)
            await ethers.provider.send('evm_increaseTime', [30001])
            await ethers.provider.send('evm_mine')
            await expect(lending.connect(addr1).WithdrawNft(0)).to.be.revertedWith('Lend time is expired.')
        })

        it('Borrow Request, Send Nft, Borrow, WithdrawNFT correctly', async () => {
            await nft.mint(addr1.address)
            await lending.connect(addr1).BorrowRequest(nft.address, 0, 30000, 20, 3)
            await lending.AddMember(addr2.address)
            await lending.connect(addr2).Vote(0, true)
            await ethers.provider.send('evm_increaseTime', [86400])
            await ethers.provider.send('evm_mine')
            await nft.connect(addr1).transferFrom(addr1.address, lending.address, 0)
            await lending.connect(addr1).Borrow(0)
            await lending.connect(addr1).WithdrawNft(0, { value: ethers.utils.parseEther(`${3 + (3 * 20) / 100}`) })

            expect(await nft.ownerOf(0)).to.equal(addr1.address)
        })
    })

    describe('Lock Eth', () => {
        it('Lock eth', async () => {
            const firstBalance = await lending.GetBalance()
            await lending.connect(addr1).LockEth(86400, { value: ethers.utils.parseEther('1') })
            const secondBalance = await lending.GetBalance()
            expect((secondBalance - firstBalance).toString()).to.equal(`${ethers.utils.parseEther('1')}`)
        })

        it('Lock eth, withdraw eth', async () => {
            const firstBalance = await lending.GetBalance()
            await lending.connect(addr1).LockEth(86400, { value: ethers.utils.parseEther('1') })
            await ethers.provider.send('evm_increaseTime', [86400])
            await ethers.provider.send('evm_mine')
            await lending.connect(addr1).WithdrawEth(0)
            const secondBalance = await lending.GetBalance()
            const expectedBalance = ethers.utils.parseEther(`${(1 * 10) / 100}`)
            expect((firstBalance - secondBalance).toString()).to.equal(expectedBalance.toString())
        })

        it('Lock eth with wrong duration', async () => {
            await expect(lending.connect(addr1).LockEth(86401, { value: ethers.utils.parseEther('1') })).to.be.revertedWith('Duration is not valid.')
        })
    })

    describe('DAO', () => {
        it('Add DAO member', async () => {
            await lending.AddMember(addr1.address)
            const member = await lending.GetMember(addr1.address)
            expect(member).to.equal(true)
        })

        it('Remove DAO member', async () => {
            await lending.AddMember(addr1.address)
            await lending.RemoveMember(addr1.address)
            const member = await lending.GetMember(addr1.address)
            expect(member).to.equal(false)
        })

        it('Vote for borrow request', async () => {
            await nft.mint(addr1.address)
            await lending.connect(addr1).BorrowRequest(nft.address, 0, 30000, 20, 3)
            await lending.AddMember(addr2.address)
            await lending.connect(addr2).Vote(0, true)
            const borrowRequest = await lending.GetLend(0)
            expect(borrowRequest.yesVote).to.equal(1)
        })

        it('Cannot vote twice', async () => {
            await nft.mint(addr1.address)
            await lending.connect(addr1).BorrowRequest(nft.address, 0, 30000, 20, 3)
            await lending.AddMember(addr2.address)
            await lending.connect(addr2).Vote(0, true)
            await expect(lending.connect(addr2).Vote(0, true)).to.be.revertedWith('You already voted.')
        })

        it('Cannot vote for non existing request', async () => {
            await lending.AddMember(addr2.address)
            await expect(lending.connect(addr2).Vote(0, true)).to.be.revertedWith('Borrow request does not exist.')
        })

        it('Cannot vote for own request', async () => {
            await nft.mint(addr1.address)
            await lending.connect(addr1).BorrowRequest(nft.address, 0, 30000, 20, 3)
            await lending.AddMember(addr1.address)
            await expect(lending.connect(addr1).Vote(0, true)).to.be.revertedWith('You cannot vote for your own request.')
        })
    })
})
