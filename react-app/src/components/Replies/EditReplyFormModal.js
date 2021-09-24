import { useState } from "react"
import { Modal } from "../../context/Modal"
import EditReplyForm from "./EditReplyForm"



const EditReplyModal = ({reply}) => {
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
                <EditReplyForm reply = {reply} closeModal = {closeModal} />
            </Modal>
        }
        </>
    )
}

export default EditReplyModal
