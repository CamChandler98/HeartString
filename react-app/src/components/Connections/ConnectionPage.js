import Connection from "./Connection"



const ConnectionPage = ({connectedHearts}) => {

    console.log('popular!!!!')
    console.log(connectedHearts)
    return (
        <>
        {connectedHearts && connectedHearts.map(connectedHeart => {
            console.log('okay got it', connectedHeart)
            return(
            <Connection key = {connectedHeart.id} connectedHeart = {connectedHeart} />
            )
        })}
        </>
    )
}

export default ConnectionPage
