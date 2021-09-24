import Heart from "./Heart"
import './HeartsPage.css'


const HeartsPage = ({hearts}) => {

    return (
        <div className = 'hearts-container'>
            { hearts &&
                hearts.map((heart,i) => {

                    return(
                        <Heart key ={heart.id} heart = {heart} />
                    )
                })
            }
        </div>
    )
}

export default HeartsPage
