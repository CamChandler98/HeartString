

const DummyHeart = ({open}) => {
    return (
        <>
        {open === true && <div className = 'heart-container' >

              <div className = 'dummy-header'>
                <div className = 'dummy-top'>
                  <h1> Your username, display name , profile picture and heart photo will appear here</h1>
                  <h2> Only you and those you've connected with will be able to see this information</h2>
               </div>
               <p className = 'dummy-text'>This is where your new hearts will appear when they are created! More hearts means more oppurtunities to connect! Why don't you try sending out a heart? When someone replies to your heart you can choose to connect with them! </p>

               </div>
        </div> }
        {open === false &&
             <div className = 'heart-container' >

             <div className = 'dummy-header'>
               <div className = 'dummy-top'>
                 <h1> Your username, display name , profile picture and heart photo will appear here</h1>
                 <h2> Only you and those you've connected with will be able to see this information</h2>
              </div>
              <p className = 'dummy-text'>This is where your closed hearts will go, you can click on hearts here and look back at the replies you received, maybe someone youre connected to replied in the past!</p>
              </div>
       </div>
        }
        </>

    )
}


export default DummyHeart
