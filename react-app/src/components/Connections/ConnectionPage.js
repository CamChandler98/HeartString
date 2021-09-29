import Connection from "./Connection"



const ConnectionPage = ({connectedHearts}) => {

    return (
        <>
        {connectedHearts && connectedHearts.map(connectedHeart => {
            return(
            <Connection key = {connectedHeart.id} connectedHeart = {connectedHeart} />
            )
        })}
        </>
    )
}

export default ConnectionPage
