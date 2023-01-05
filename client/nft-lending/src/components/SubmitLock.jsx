import '../tail.css'
import { lendingAddress, lendingAbi } from '../abi/lending'
import { ethers } from 'ethers'

const SubmitLock = ({ step, setStep, lockTerms, account }) => {
    const confirmLock = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner(account)
        let lending = new ethers.Contract(lendingAddress, lendingAbi, signer)
        await lending.LockEth(lockTerms.duration, { value: ethers.utils.parseEther(`${lockTerms.amount}`) })
    }
    const declineLock = () => {
        setStep(0)
    }

    return (
        step === 1 && (
            <div class="flex flex-col min-h-[25rem] bg-black bg-opacity-50 rounded-[2rem] p-[3rem]">
                <div class="flex flex-row justify-around ">
                    <div class="mx-auto flex flex-col space-y-4">
                        <span class="text-white text-4xl mb-[2rem]"> Lock Terms </span>
                        <div>
                            <span class="text-white text-2xl"> APR: </span>
                            <span class="text-white text-2xl"> {lockTerms.apr}% </span>
                        </div>
                        <div>
                            <span class="text-white text-2xl"> Amount: </span>
                            <span class="text-white text-2xl"> {lockTerms.amount} MATIC </span>
                        </div>
                        <div>
                            <span class="text-white text-2xl"> Duration: </span>
                            <span class="text-white text-2xl"> {lockTerms.duration / 86400} Days</span>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row ml-auto mr-0 mt-auto">
                    <button onClick={confirmLock} class="text-white text-2xl w-[10rem] h-[3rem] mr-[2rem] bg-[#54B1BC] rounded-2xl ">
                        Accept
                    </button>
                    <button onClick={declineLock} class="text-white text-2xl w-[10rem] h-[3rem] mr-[2rem] bg-[#54B1BC] rounded-2xl ">
                        Decline
                    </button>
                </div>
            </div>
        )
    )
}

export default SubmitLock
