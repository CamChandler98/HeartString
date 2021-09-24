import { useState } from "react"
import { Modal } from "../../context/Modal"
import CreateHeartFormStyle from "./CreateHeartFormStyle"
import EditHeartForm from "./EditHeartForm"


const EditHeartModal = ({content, heart_id, content_url, time_to_live}) => {
    const [showModal, setShowModal] = useState(false)

    const handleClick = () => {

        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return(
        <>
        <button className='edit-heart' onClick = {handleClick}>Edit</button>
        {showModal &&
            <Modal  onClose = {() => setShowModal(false)}>
                <CreateHeartFormStyle>
                <EditHeartForm closeModal = {closeModal} content = {content}heart_id = {heart_id} content_url = {content_url} time_to_live = {time_to_live} />
                </CreateHeartFormStyle>
            </Modal>
        }
        </>
    )
}

export default EditHeartModal
