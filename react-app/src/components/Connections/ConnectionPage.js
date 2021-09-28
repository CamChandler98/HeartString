import Connection from "./Connection"



const ConnectionPage = ({connectedHearts}) => {


    return (
        <>
        {connectedHearts && connectedHearts.map(connectedHeart => {
            <Connection connectedHeart = {connectedHeart} />
        })}
        </>
    )
}

export default ConnectionPage
