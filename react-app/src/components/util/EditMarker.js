import { useEffect, useState } from "react"
import './EditMarker.css'


const EditMarker = ({obj}) => {
    const [isEdited, setIsEdited] = useState(false)

    const checkEdited = () => {
        if(obj.created_at !== obj.updated_at){
            return setIsEdited(true)
        }else{
            return setIsEdited(false)
        }
    }

    useEffect(() => {
        checkEdited()
    }, [obj])
    return(
        <div className ='edit-marker'>
         {isEdited && <span>(Edited)</span>}
        </div>
    )

}

export default EditMarker
