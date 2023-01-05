import '../tail.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

const LoanTerms = ({ step, setStep, account, lockTerms, setLockTerms }) => {
    const durationToApr = (duration) => {
        if (duration === '1 Day') {
            return '10%'
        } else if (duration === '7 Days') {
            return '20%'
        } else if (duration === '30 Days') {
            return '30%'
        }
    }

    const confirmTerms = async () => {
        const amountConverted = Number.parseFloat(lockTerms.amount.toString().substring(0, lockTerms.amount.toString().indexOf('ETH')))
        const durationConverted = Number.parseFloat(lockTerms.duration.toString().substring(0, lockTerms.duration.toString().indexOf('Days'))) * 86400
        const aprConverted = Number.parseFloat(durationToApr(lockTerms.duration).toString().substring(0, durationToApr(lockTerms.duration).toString().indexOf('%')))
        setLockTerms({
            ...lockTerms,
            apr: aprConverted,
            amount: amountConverted,
            duration: durationConverted,
        })
        setStep(1)
    }

    return (
        step === 0 && (
            <div class={`flex flex-col bg-black bg-opacity-50 w-[118rem] h-[20rem] mx-auto mb-[1rem] mt-auto rounded-[2rem]`}>
                <div class="grid grid-cols-3 px-[7rem]">
                    <div class="flex flex-col">
                        <p class="text-white text-3xl mt-[2rem] ml-[4rem]">Loan duration</p>
                        <select
                            type="text"
                            onChange={(e) => setLockTerms({ ...lockTerms, duration: e.target.value })}
                            value={lockTerms.duration}
                            class="placeholder-white px-4 bg-[#58504C] bg-opacity-60 text-white w-[8rem] ml-[5rem] mt-[2rem] rounded-lg block py-2.5"
                        >
                            <option value="1 Day">1 Day</option>
                            <option value="7 Days">7 Days</option>
                            <option value="30 Days">30 Days</option>
                        </select>
                    </div>
                    <div class="flex flex-col">
                        <p class="text-white text-3xl mt-[2rem] ml-[4rem]">APR</p>
                        <input
                            type="text"
                            placeholder="10%"
                            disabled={true}
                            value={durationToApr(lockTerms.duration)}
                            class="placeholder-white px-8 bg-[#58504C] bg-opacity-60 text-white w-[8rem] ml-[5rem] mt-[2rem] rounded-lg block py-2.5"
                        ></input>
                    </div>
                    <div class="flex flex-col">
                        <p class="text-white text-3xl mt-[2rem] ml-[4rem]">Loan amount</p>
                        <input
                            type="text"
                            placeholder="50 ETH"
                            onChange={(e) => {
                                setLockTerms({ ...lockTerms, amount: e.target.value })
                            }}
                            class="placeholder-white px-8 bg-[#58504C] bg-opacity-60 text-white w-[8rem] ml-[5rem] mt-[2rem] rounded-lg block py-2.5"
                        ></input>
                    </div>
                </div>
                <button onClick={confirmTerms} class="text-white text-2xl w-[16rem] h-[4rem] mr-[2rem] ml-auto mb-[1rem] mt-auto col-start-3 bg-[#54B1BC] rounded-2xl ">
                    Confirm loan terms
                </button>
            </div>
        )
    )
}

export default LoanTerms
