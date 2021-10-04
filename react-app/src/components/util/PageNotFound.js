import pnfImage from '../graphics/404.svg'
import {Link} from 'react-router-dom'
import '../util/PageNotFound.css'

const PageNotFound = () => {


    return(
        <div className = 'home-container'>
        <div className = 'focus-content'>
        <div className = 'not-found'>
        <h1>
        Page Not Found
        </h1>
        <img src = {pnfImage} alt = 'page not found' />
        <h2>
        <Link to = '/home'>
            Return to home?
        </Link>
        </h2>
        </div>
        </div>
        </div>
    )
}


export default PageNotFound
