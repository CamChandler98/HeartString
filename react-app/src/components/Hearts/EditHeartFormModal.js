import { useState } from "react"
import { Modal } from "../../context/Modal"
import CreateHeartFormStyle from "./CreateHeartFormStyle"
import EditHeartForm from "./EditHeartForm"


const EditHeartModal = ({content, heart_id, content_url, time_to_live}) => {
    const [showModal, setShowModal] = useState(false)

    const handleClick = (e) => {
        e.stopPropagation()
        setShowModal(true)
    }

    const closeModal = (e) => {
        e.stopPropagation()
        setShowModal(false)
    }

    return(
        <>
        <button onClick = {handleClick}>Edit</button>
        {showModal &&
            <Modal onClick = {handleClick} onClose = {closeModal}>
                <CreateHeartFormStyle onClick = {handleClick}>
                <EditHeartForm onClick = {handleClick} closeModal = {closeModal} content = {content}heart_id = {heart_id} content_url = {content_url} time_to_live = {time_to_live} />
                </CreateHeartFormStyle>
            </Modal>
        }
        </>
    )
}

export default EditHeartModal
