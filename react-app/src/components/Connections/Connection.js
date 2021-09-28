


const Connection = ({connectedHeart}) => {

    console.log(`it's mine now!`, connectedHeart)
    return (
        <div>
            <div>
               <div>
                    <img className ='connected-profile-picture' src = {connectedHeart.connector.profile_picture_url} alt ={`connection ${connectedHeart.connector.username} profile picture`}/>
                <p>{connectedHeart.connector.display_name}</p>
               </div>
               <span>@{connectedHeart.connector.username}</span>
            </div>
            <h1>Connected by</h1>
            <div>
                <p>
                    {connectedHeart.content}
                </p>
            </div>
        </div>
    )
}


export default Connection
