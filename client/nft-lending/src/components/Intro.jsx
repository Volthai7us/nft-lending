import '../tail.css'
import Riddles from './Riddles'
import About from './About'
import How from './How'
import Footer from './Footer'
import Loan from '../pages/Loan'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'

const Intro = ({ account }) => {
    console.log(account)

    return (
        <div>
            <Riddles />
            <About />
            <Home />
            <How />
            <Footer />
        </div>
    )
}

export default Intro
