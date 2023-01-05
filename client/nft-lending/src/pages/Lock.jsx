import '../tail.css'
import { useState } from 'react'
import LockTerms from '../components/LockTerms'
import SubmitLock from '../components/SubmitLock'
import OwnedLocks from '../components/OwnedLocks'

const Lock = ({ account }) => {
    const [step, setStep] = useState(0)
    const [lockTerms, setLockTerms] = useState({
        apr: 0,
        amount: 0,
        duration: 0,
    })

    return (
        <div class="flex flex-col bg-black bg-opacity-50 w-[120rem] mx-auto mt-[5rem] rounded-[2rem] space-y-16 space-y-[8rem] mb-[4rem]">
            <OwnedLocks account={account} />
            <div class="flex flex-row bg-black bg-opacity-50 w-[120rem] h-[5rem] mx-auto rounded-[2rem]">
                <p class="text-[#E5C091] text-4xl my-auto ml-[4rem]">Choose lock terms</p>
                <p class="text-white text-4xl ml-auto mr-[4rem] align-baseline my-auto">
                    <span class={`${step === 0 ? 'text-[#54B1BC]' : 'text-white'}`}>1. Lock terms</span>
                    <span>&gt;</span>
                    <span class={`${step === 2 ? 'text-[#54B1BC]' : 'text-white'}`}>2. Submit lock</span>
                </p>
            </div>

            <div class={`mt-[1rem]`}>
                <p class="text-[#E5C091] text-3xl h-[5rem] ml-[4rem]">
                    {step === 0 ? (
                        <span>
                            <span class="text-white">Please specify the asset you want to borrow and the loan duration.</span>
                            <br />
                            <br />
                            You should write terms as shown in the placeholder.
                        </span>
                    ) : step === 1 ? (
                        'Please choose an asset or multiple assets that you would like to use as collateral for your loan'
                    ) : (
                        'Submit the loan request'
                    )}
                </p>
            </div>

            <LockTerms step={step} setStep={setStep} account={account} lockTerms={lockTerms} setLockTerms={setLockTerms} />

            <SubmitLock step={step} setStep={setStep} lockTerms={lockTerms} account={account} />
        </div>
    )
}

export default Lock
