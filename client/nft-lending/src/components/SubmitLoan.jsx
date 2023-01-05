import '../tail.css'
import erc721 from '../abi/erc721'
import { lendingAddress, lendingAbi } from '../abi/lending'
import { ethers } from 'ethers'

const SubmitLoan = ({ step, setStep, collateral, loanTerms, account }) => {
    const confirmLoan = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner(account)
        let lending = new ethers.Contract(lendingAddress, lendingAbi, signer)
        await lending.BorrowRequest(collateral.token_address, collateral.token_id, loanTerms.duration, loanTerms.apr, loanTerms.amount)
    }
    const declineLoan = () => {
        setStep(1)
    }

    return (
        step === 2 && (
            <div class="flex flex-col min-h-[25rem] bg-black bg-opacity-50 rounded-[2rem] p-[3rem]">
                <div class="flex flex-row justify-around ">
                    <div class="mx-auto flex flex-col space-y-4">
                        <span class="text-white text-4xl mb-[2rem]"> Loan Terms </span>
                        <div>
                            <span class="text-white text-2xl"> APR: </span>
                            <span class="text-white text-2xl"> {loanTerms.apr} </span>
                        </div>
                        <div>
                            <span class="text-white text-2xl"> Amount: </span>
                            <span class="text-white text-2xl"> {loanTerms.amount} </span>
                        </div>
                        <div>
                            <span class="text-white text-2xl"> Duration: </span>
                            <span class="text-white text-2xl"> {loanTerms.duration} </span>
                        </div>
                    </div>
                    <div class="mx-auto flex flex-col space-y-4">
                        <span class="text-white text-4xl mb-[2rem]"> Collateral </span>
                        <div>
                            <span class="text-white text-2xl"> Token Id: </span>
                            <span class="text-white text-2xl"> {collateral.token_id} </span>
                        </div>
                        <div>
                            <span class="text-white text-2xl"> Token Address: </span>
                            <span class="text-white text-2xl"> {collateral.token_address} </span>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row ml-auto mr-0 mt-auto">
                    <button onClick={confirmLoan} class="text-white text-2xl w-[10rem] h-[3rem] mr-[2rem] bg-[#54B1BC] rounded-2xl ">
                        Accept
                    </button>
                    <button onClick={declineLoan} class="text-white text-2xl w-[10rem] h-[3rem] mr-[2rem] bg-[#54B1BC] rounded-2xl ">
                        Decline
                    </button>
                </div>
            </div>
        )
    )
}

export default SubmitLoan
