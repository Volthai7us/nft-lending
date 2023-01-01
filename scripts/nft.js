const { ethers, getNamedAccounts } = require('hardhat')

async function main() {
    const { deployer } = await getNamedAccounts()
    const nft = await ethers.getContract('NFT', deployer)
    console.log(`Got contract nft at ${nft.address}`)
    console.log('Funding contract...')
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
