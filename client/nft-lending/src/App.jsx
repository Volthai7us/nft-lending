import './tail.css'
import Navbar from './components/Navbar'
import Intro from './components/Intro'
import Loan from './pages/Loan'
import Dashboard from './pages/Dashboard'
import NotAccount from './pages/NotAccount'
import NotFound from './pages/NotFound'
import Lend from './pages/Lend'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {
    const [account, setAccount] = useState([])
    return (
        <>
            <Navbar setAccount={setAccount} />
            <Router>
                <Routes>
                    <Route path="/" element={<Intro account={account} />}></Route>
                    <Route path="/Borrow" element={account.length > 0 ? <Loan account={account} /> : <NotAccount />}></Route>
                    <Route path="/Dashboard" element={account.length > 0 ? <Dashboard account={account} /> : <NotAccount />}></Route>
                    <Route path="/Lend" element={account.length > 0 ? <Lend account={account} /> : <NotAccount />}></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </Router>
        </>
    )
}

export default App
