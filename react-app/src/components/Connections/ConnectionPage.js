import Connection from "./Connection"
import CreateHeartModal from "../Hearts/CreateHeartModal"


const ConnectionPage = ({connectedHearts}) => {
    console.log('hi from connection page ', connectedHearts)
    return (
        <>
        {connectedHearts.length >= 1 && connectedHearts.map(connectedHeart => {
            return(
            <Connection key = {connectedHeart.id} connectedHeart = {connectedHeart} />
            )
        })}
        {connectedHearts.length < 1 &&

        <div  className = 'connection-card no-connected-hearts'>

            <h1>
                Looks like you don't have any connected hearts
            </h1>
            <h2>
                Try sending a heart out there! When somone someone replies to an open heart you can choose to connect with them!
            </h2>
            <h2>
                Choose carefully, there's only one connection per heart.
            </h2>
        </div>
            }
        </>
    )
}

export default ConnectionPage
