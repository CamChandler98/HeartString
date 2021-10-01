import Connection from "./Connection"



const ConnectionPage = ({connectedHearts}) => {

    return (
        <>
        {connectedHearts && connectedHearts.map(connectedHeart => {
            return(
            <Connection key = {connectedHeart.id} connectedHeart = {connectedHeart} />
            )
        })}
        {!connectedHearts &&

        <div>

            <h1>
                Looks like you don't have any connections
            </h1>
            <h2>
                Try sending a heart out there! When somone someone replies to an open heart you can choose to connect with them. Choose carefully, there's only one connection per heart.
            </h2>
        </div>
            }
        </>
    )
}

export default ConnectionPage
