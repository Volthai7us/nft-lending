import './tail.css'
import Navbar from './components/Navbar'
import Intro from './components/Intro'
import { useState } from 'react'
function App() {
    const [account, setAccount] = useState([])
    return (
        <>
            <Navbar setAccount={setAccount} />
            <Intro account={account} />
        </>
    )
}

export default App
