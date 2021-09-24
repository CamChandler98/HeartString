import { goDeleteHeart } from "../../store/hearts"
import { goDeleteReply } from "../../store/replies"
import { useDispatch } from "react-redux"

const Delete = ({id, type , closeModal}) => {
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
    }
    return(

        <div className = 'logout-container'>
            <h1>Are you sure you want to delete this {type} </h1>

            <button onClick = {handleClick}>
                delete
            </button>

        </div>
    )
}

export default Delete
