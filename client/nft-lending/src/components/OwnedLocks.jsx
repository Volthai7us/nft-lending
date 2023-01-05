import { lendingAddress, lendingAbi } from '../abi/lending'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'

const OwnedLocks = ({ account }) => {
    const [locks, setLocks] = useState([
        {
            id: 0,
            owner: '',
            deadline: 0,
            duration: 0,
            amount: 0,
        },
    ])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getAllLocks = async () => {
            setLoading(true)
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner(account)
            let lending = new ethers.Contract(lendingAddress, lendingAbi, signer)
            let count = await lending.lockCount()
            const currentLocks = []
            for (let i = 0; i < count; i++) {
                let lock = await lending.locks(i)
                if (lock.owner.trim().toUpperCase() !== account.toUpperCase().trim()) continue
                currentLocks.push({
                    id: lock.lockId.toString(),
                    owner: lock.owner,
                    deadline: lock.deadline.toString(),
                    duration: lock.duration.toString(),
                    amount: lock.amount.toString(),
                })
            }
            setLocks(currentLocks)
            setLoading(false)
        }

        getAllLocks()
    }, [setLocks])

    const WithdrawEth = async (lockId) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner(account)
        let lending = new ethers.Contract(lendingAddress, lendingAbi, signer)
        await lending.WithdrawEth(lockId)
    }

    if (loading) return <div class="text-5xl text-black mt-[5rem] text-center">Loading...</div>

    return (
        <div class="px-[2rem] py-[2rem] grid grid-cols-4 grid-4">
            {locks.map((lock, i) => {
                return (
                    <div key={i} class="flex flex-col bg-black bg-opacity-50 min-w-[20rem] mx-auto p-[2rem]">
                        <span class="text-white text-3xl"> Lock ID: {lock.id}</span>
                        <span class="text-white text-3xl"> Duration: {lock.duration / 86400} Days</span>
                        <span class="text-white text-3xl"> Amount: {lock.amount / 1000000000000000000} ETH</span>
                        <button class="text-white text-3xl bg-[#E5C091] rounded-full w-[10rem] mx-auto mt-[2rem]" onClick={(e) => WithdrawEth(lock.id)}>
                            Collect
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default OwnedLocks
