import '../tail.css'
import logo from '../images/logo.png'
import { useState } from 'react'
import body1 from '../images/body_1.png'

const Navbar = ({ setAccount }) => {
    const [connectButton, setConnectButton] = useState('Connect')
    const [localaccount, setLocalAccount] = useState([])

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' })
            } catch (error) {
                console.log(error)
            }
            setConnectButton('Connected')
            const accounts = await window.ethereum.request({ method: 'eth_accounts' })
            setLocalAccount(accounts[0])
            setAccount(accounts[0])
        } else {
            setConnectButton('Install Metamask')
        }
    }

    return (
        <nav class="sticky top-0 z-50">
            <div class="flex justify-center items-center bg-[#181412] text-black relative shadow-sm space-x-16" role="navigation">
                <div class="px-4 cursor-pointer">
                    <a href="/">
                        <img width="150" src={logo} alt="logo" />
                    </a>
                </div>
                <div class="space-x-16 md:block hidden">
                    <a href="/" class="p-4 text-white">
                        Home
                    </a>
                    <a href="/Lend" class="p-4 text-white">
                        Lend
                    </a>
                    <a href="/Lock" class="p-4 text-white">
                        Lock
                    </a>
                    <a href="/Dashboard" class="p-4 text-white">
                        Dashboard
                    </a>
                    {localaccount.length <= 0 ? (
                        <a href="#" class="px-16 p-4 text-white bg-[#BD896C] rounded-full text-3xl" onClick={connectWallet}>
                            {' '}
                            {connectButton}{' '}
                        </a>
                    ) : null}
                    {localaccount.length > 0 ? <img class="inline rounded-full" width="100" src={body1} alt="avatar" /> : null}
                    {localaccount.length > 0 ? <a class="text-white"> {localaccount.slice(0, 10)}... </a> : null}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
