import './Connection.css'


const Connection = ({connectedHeart}) => {

    return (
        <div className = 'connection-card'>
            <div className = 'connector-info'>
               <div>
                <p>{connectedHeart.connector.display_name}</p>
               </div>
            </div>
            <h1 className = 'connected-card-text'>Connected by</h1>
            <div className = 'connection-content'>
                <div>
                    <div className = 'user-text-picture-card' >
                        <div className = 'user-card-info'>
                        <img className ='connected-profile-picture' src = {connectedHeart.user_profile_pic} alt ={`your profile picture`}/>
                        <span>@{connectedHeart.username}</span>
                        </div>
                        <div className = 'user-text-content1 cb1'>
                            <p>
                                {connectedHeart.content}
                            </p>
                        </div>
                    </div >
                    <div className = 'user-text-picture-card'>
                        <div className = 'connector-card-info'>
                        <img className ='connected-profile-picture' src = {connectedHeart.connector.profile_picture_url} alt ={`connection ${connectedHeart.connector.username} profile picture`}/>
                        <span>@{connectedHeart.connector.username}</span></div>
                        <div div className = 'user-text-content2 cb2'>
                        <p>
                            {connectedHeart.grand_reply_content}
                        </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Connection
