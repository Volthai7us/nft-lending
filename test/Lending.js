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
        await deployer.sendTransaction({ to: lending.address, value: ethers.utils.parseEther('1') })
    })

    describe('Balance', () => {
        it('Should send 100 eth to lending contract', async () => {
            const tx = await deployer.sendTransaction({ to: lending.address, value: ethers.utils.parseEther('1') })
            const balance = await ethers.provider.getBalance(lending.address)
            expect(balance).to.equal(ethers.utils.parseEther('2'))
        })
    })

    describe('Lock eth', () => {
        it('Should lock eth correctly', async () => {
            const tx = await lending.lock(604800, { value: ethers.utils.parseEther('0.1') })
            const balance = await ethers.provider.getBalance(lending.address)
            expect(balance).to.equal(ethers.utils.parseEther('1.1'))
        })

        it('Should reverted withdraw correctly', async () => {
            const tx = await lending.lock(604800, { value: ethers.utils.parseEther('0.1') })
            await expect(lending.withdraw(0)).to.be.revertedWith('Lock is not expired')
        })

        it('Should withdraw eth correctly', async () => {
            const tx = await lending.connect(addr1).lock(604, { value: ethers.utils.parseEther('0.1') })
            await ethers.provider.send('evm_increaseTime', [604801])
            await ethers.provider.send('evm_mine')
            const tx2 = await lending.connect(addr1).withdraw(0)
            const balance = await ethers.provider.getBalance(lending.address)
            expect(balance).to.equal(ethers.utils.parseEther('1'))
            // console.log(tx2);
            // const balance2 = await ethers.provider.getBalance(addr1.address);
            // expect(balance2).to.equal(ethers.utils.parseEther("10").sub(tx2.gasPrice.toString()).sub(tx.gasPrice.toString()));
        })
    })

    describe('Deployment', () => {
        it('Should set nft correctly', async () => {
            const name = await nft.name()
            const symbol = await nft.symbol()
            expect(name).to.equal('My NFT')
            expect(symbol).to.equal('NFT')
        })

        it('Should set nft amount correctly', async () => {
            const amount = await nft.totalSupply()
            expect(amount).to.equal(0)
        })

        it('Should set nft amount for user correctly', async () => {
            const amount = await lending.balanceOf(addr1.address, nft.address)
            expect(amount).to.equal(0)
        })
    })

    describe('Minting', () => {
        it('Should mint nft correctly', async () => {
            await nft.mint(addr1.address)
            await nft.mint(addr1.address)
            await nft.mint(addr1.address)
            const amount = await nft.totalSupply()
            expect(amount).to.equal(3)
        })

        it('Should mint nft for user correctly', async () => {
            await nft.mint(addr1.address)
            const amount = await lending.balanceOf(addr1.address, nft.address)
            expect(amount).to.equal(1)
        })

        it('Should correctly return owner of nft', async () => {
            await nft.mint(addr1.address)
            const owner = await lending.connect(addr1).ownerOf(nft.address, 0)
            expect(owner).to.equal(addr1.address)
        })
    })

    describe('NFT sending', () => {
        it('Should send nft correctly', async () => {
            await nft.mint(addr1.address)
            await nft.connect(addr1).transferFrom(addr1.address, addr2.address, 0)
            const amount = await lending.balanceOf(addr1.address, nft.address)
            expect(amount).to.equal(0)
            const amount2 = await lending.balanceOf(addr2.address, nft.address)
            expect(amount2).to.equal(1)
        })

        it('Should send nft for user correctly', async () => {
            await nft.mint(addr1.address)
            await nft.connect(addr1).transferFrom(addr1.address, addr2.address, 0)
            const amount = await lending.balanceOf(addr2.address, nft.address)
            expect(amount).to.equal(1)
        })

        it('Should send nft correctly on lending contract', async () => {
            await nft.mint(addr1.address)
            await nft.connect(addr1).approve(lending.address, 0)
            await lending.connect(addr1).transferNFT(addr1.address, addr2.address, nft.address, 0)
            const amount = await lending.balanceOf(addr1.address, nft.address)
            expect(amount).to.equal(0)
            const amount2 = await lending.balanceOf(addr2.address, nft.address)
            expect(amount2).to.equal(1)
        })

        it('borrow, send nft, get back nft, withdraw eth', async () => {
            await nft.mint(addr1.address)
            await nft.connect(addr1).approve(lending.address, 0)
            await lending.connect(addr1).borrow(nft.address, 0, 3000, 2, 2)
            // await ethers.provider.send('evm_increaseTime', [3001])
            // await ethers.provider.send('evm_mine')
            // await lending.connect(addr1).getBackNFT(addr1.address, nft.address, 0)
            // expect(await lending.connect(addr1).getBackNFT(addr1.address, nft.address, 0)).to.be.reverted()
        })
    })

    describe('Get back nft', () => {
        it('Should get back nft correctly', async () => {
            await nft.mint(addr1.address)
            await nft.connect(addr1).transferFrom(addr1.address, lending.address, 0)
            await lending.connect(addr1).getBackNFT(addr1.address, nft.address, 0)
            const amount = await lending.balanceOf(addr1.address, nft.address)
            expect(amount).to.equal(1)
        })
    })
})
