import { goDeleteHeart } from "../../store/hearts"
import { goDeleteReply } from "../../store/replies"
import { useDispatch } from "react-redux"
import { useAlert } from "../../context/Alert"
import './Delete.css'
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

export default Delete
