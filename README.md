# HeartString

## A little about HeartString

HeartString is a full-stack application meant to invoke the feeling of connecting with a stranger. Users of HeartString can post anonymous Hearts to express how they are feeling. Other user can respond to Heart you have posted, and if one of the responses moves you, you can choose to connect with them. Users you are connected to can see 
which hearts posted are yours. Try to make as many connections as you can!

Live: https://heart-string.herokuapp.com/

## Development
* You can read more about the project using the wiki located at: https://github.com/CamChandler98/HeartString/wiki
* To start a development environment:
    1. Clone the repository at: https://github.com/CamChandler98/HeartString
    2. Run the command "npm install" from the react-app directory in your terminal to install dependencies for the front end
    3. Run the command "pipenv install" from the root directory in your terminal to install dependencies for the backend and create a virtual environment.
    4. Run the command "flask run" from the root directory to start the backend server.
    5. Run the command "npm start" from the react-app directory to start the frontend server.
    6. Navigate to the localhost port specified in config/index.js

## Technologies Used
* Javascript
* HTML/CSS
* Reactjs
* Redux
* Python
* Node.js
* Flask
* SQLAlchemy
* Socket.io
* Postgres
* Heroku
* AWS S3
* Git/Github
* Faker


## Application Architecture 

HeartString is built using a React frontend , a Flask web framework , Flask-SQLAlchemy ORM and Postgresql RDMS 

### React

React's components and state management greatly eases the process of translating new features into intuitive UI elements

### Redux 

Redux is used as a store for HeartString as well as being used to make API calls to the backend server

### Socket.io

Socket.io to emit and listen to messages on the frontend and the backend. THis allows user to receive notifications when they are messaged and to instantly message each other.


### Flask and Flask-SQLAlchemy

Flask and Flask-SQLAlchemy greatly increased the speed of developent by easing the process of writing API routes and database models

## Key Feautres
- Users can create Hearts

<p align="center">
  <img src="https://github.com/CamChandler98/HeartString/blob/main/Visualization/Screencap/HeartString-Create-Heart.gif?raw=true" alt="HeartString create heart">
</p>

- Users can reply to hearts

<p align="center">
  <img src="https://github.com/CamChandler98/HeartString/blob/main/Visualization/Screencap/HeartString-Reply.gif?raw=true" alt="HeartString create reply">
</p>

- Users can make a connection from replies on their hearts

<p align="center">
  <img src="https://github.com/CamChandler98/HeartString/blob/main/Visualization/Screencap/HeartString-Connect.gif?raw=true" alt="HeartString create connection">
</p>

- Users can message their connections!

<p align="center">
  <img src="https://github.com/CamChandler98/HeartString/blob/main/Visualization/Screencap/HeartString-Message.gif?raw=true" alt="HeartString send message">
</p>

- Users have a profile page where they can edit or delete their profile, as well as veiw all of their hearts and connections

<p align="center">
  <img src="https://github.com/CamChandler98/HeartString/blob/main/Visualization/Screencap/HeartString-Profile.png?raw=true" alt="HeartString profile">
</p>

## Code Snippets

### Modular component for deleteing resources

This component was built so that new delete modals would not have to be created for every resource. The component accepts a resources id and it's type as a prop. Thunks are dispatched based on which type was passed in as a prop.
``` javascript
const Delete = ({id, type , closeModal}) => {

    const {alertText, setShowAlert ,setAlertText} = useAlert()

    const dispatch = useDispatch()

    const typeHandeler = {
        heart: goDeleteHeart,
        reply: goDeleteReply
    }


    const handleClick = (e) =>{
        e.stopPropagation()
        let thunk = typeHandeler[type]

        dispatch(thunk(id))
        closeModal(e)

        setAlertText(`Sucessfully Deleted ${type}`)

        setShowAlert(true)
    }
    return(

        <div onClick = { e => e.stopPropagation()} className = 'delete-container'>
            <h1>Are you sure you want to delete this {type} ? </h1>

            <button onClick = {handleClick}>
                delete
            </button>

        </div>
    )
}

```



### Message form component to emit notification upon successful post

The MessageForm component updates a div with the content of a message upon user input. Upon sucessfull posting of a message a WebSocket event is emitted that updates the recipients message store.

``` javascript
const MessageForm = ({partner}) => {

    let {socketio} = useSocket()

    const dispatch = useDispatch()
    let initialState = {content:''}
    const errorObj = {
        content: null
    }
    let editText = useRef('')
    const [content, setContent] = useState(initialState)
    const [errors, setErrors] = useState(errorObj)

    const user = useSelector(state => state.session.user)

    const messagePartner = async (e) => {
        e.preventDefault()
        let message = content.content
        content.content = ''

        let res = await dispatch(goSendMessage(message,user.id,partner.id))
        if(res === 'ok'){
            let addy = {sent_from: user.id , sent_to: partner.id }

            socketio.emit('connection_message', addy)
            socketio.emit('notify-user', {data: partner.id})
        }else{
            setErrors({...res})
        }

        setContent({...initialState})

        let boxINeed= document.getElementById('send-message-input')

        boxINeed.innerText = ''
    }

    const updateContent = (e) => {
           content.content = e.target.innerText
    }

    return (
        <>
        {partner && user &&
        <form
        className = 'message-form'
            onSubmit = {messagePartner}
        >
            <div className = 'message-box'>
            <div className = 'message-input'
                id = 'send-message-input'
                innertext = { errors.content ? errors.content[0] : content.content}
                onInput = {updateContent}
                value = {content.content}
                contentEditable = {true}
                suppressContentEditableWarning={true}
                >
                </div>
            </div>
            <input className = 'send-icon' type="image" src={sendIcon}alt="Send message" />
        </form>

        }
    </>
    )
}

```
Backend socket that listens for a posting of a message and emits a response to the messages recipient 
``` python
@socketio.on('connection_message')
def send_message(json):
    addy = f'message_to_{json["sent_to"]}_from_{json["sent_from"]}'
    socketio.emit(addy)
```

This component listens for a WebSocket event from the backend and upon reciept calls a thunk to update the open conversation
``` javascript
const Messages = ({partner, setPartner}) => {
    let {socketio} = useSocket()

    const dispatch = useDispatch()
    const [messages, setMessages] = useState([])
    const user = useSelector(state => state.session.user)

    // useEffect(() => {
    //     setPartner(activeConnection)
    // }, [activeConnection])

    useEffect(() => {
        if(partner && user){
        dispatch(goGetConversation(user.id, partner.id))
    }
    }, [partner,user])

    const messagesState = useSelector( state => state.messages.conversation)

    useEffect(async () => {
        if(user && partner){
            socketio.off()
            console.log('loooking for messages to', user.id , 'from' , partner.id)
        socketio.on(`message_to_${user.id}_from_${partner.id}`, async () => {

            console.log('looks like a message from', user.id, 'to,' , partner.id)
            await dispatch(goGetConversation(user.id, partner.id))
        })
        socketio.on(`notification_to_${user.id}`, async () => {
            console.log('got a noti!')
            dispatch(getMessageNotifications(user.id))
        })
    }

    },[user,partner])

    useEffect(() => {

        setMessages([...Object.values(messagesState)])
    }, [messagesState, partner])


    return (
        <>

            {messages && messages.map( (message, i) => {


                return (<Message message_user_id = {message.sender_id}content = {message.content} user_pic = {message.sender_pic} key = {message.id} user_id = {user?.id} />)
            })}

        </>
    )

}


export default Messages
```

## Conclusion and Next Steps

HeartString has all the functionality it needs to be a serviceable app , but there are a lot of times where it feels very empty. Future plans include features that allow users to connect in other ways such as short surveys and live group activity. The style is something I am greatly satisfied by, but the transitions between different components can be very jarring so in the future it would also be great to include some animation to ease those transitions

