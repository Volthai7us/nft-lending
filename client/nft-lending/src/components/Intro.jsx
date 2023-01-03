import '../tail.css'
import body2 from '../images/body_2.png'
import Riddles from './Riddles'
import About from './About'
import How from './How'
import Footer from './Footer'
import Loan from '../pages/Loan'
import Home from '../pages/Home'

const Intro = ({ account }) => {
    console.log(account)

    return (
        <div>
            <Riddles />
            {account.length > 0 && <Loan account={account} />}
            <About />
            <Home />
            <How />
            <Footer />
        </div>
    )
}

export default Intro
