const { run } = require("hardhat")

const verify = async (contractAddress, args) => {
    console.log("Verifiying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            args: args,
        })
    } catch (e) {
        if (e.messsage.toLowerCase().includes("already verified")) {
            console.log("Already verified.")
        } else {
            console.log(e)
        }
    }
}

module.exports = { verify }
