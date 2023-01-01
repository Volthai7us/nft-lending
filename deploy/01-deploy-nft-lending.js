const { network, ethers } = require('hardhat')
const { developmentChains, networkConfig } = require('../helper-hardhat-config')
const { verify } = require('../utils/verify')

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const args = ['My NFT', 'NFT', 'https://my-json-server.typicode.com/abcoathup/samplenft/tokens/']
    const nft = await deploy('ERC721PresetMinterPauserAutoId', {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    //mint 10 tokens
    const nftContract = await ethers.getContract('ERC721PresetMinterPauserAutoId', deployer)
    for (let i = 0; i < 10; i++) {
        console.log(`Minting token ${i}`)
        await nftContract.mint(deployer)
    }

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(nft.address, args)
    }

    console.log('--------------------------------')
}

module.exports.tags = ['all', 'nft']
