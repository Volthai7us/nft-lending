const { network, ethers } = require('hardhat')
const { developmentChains, networkConfig } = require('../helper-hardhat-config')
const { verify } = require('../utils/verify')

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const acc1 = '0x5DB9E05E07F5b5c2f65e98A30426F7F1A6D9680F'

    const args = ['My NFT', 'NFT', 'https://my-json-server.typicode.com/abcoathup/samplenft/tokens/']
    const nft = await deploy('ERC721PresetMinterPauserAutoId', {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    const nftContract = await ethers.getContract('ERC721PresetMinterPauserAutoId', deployer)
    for (let i = 0; i < 3; i++) {
        console.log(`Minting token ${i}`)
        await nftContract.mint(acc1)
    }

    // if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    //     await verify(nft.address, args)
    // }

    console.log('--------------------------------')
}

module.exports.tags = ['all', 'nft']
