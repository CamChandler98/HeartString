import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import Delete from "./Delete";


const DeleteModal = ({type, id}) => {
    const [showModal, setShowModal] = useState(false)

    const handleClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setShowModal(true)
    }

    const closeModal = (e) => {
        e.stopPropagation()
        setShowModal(false)
    }

    return(
        <>
        <button onClick = {handleClick}>
            Delete
        </button>
        {showModal &&
            <Modal onClick = {handleClick} onClose = {closeModal}>
                <Delete type ={type} id = {id} onClick = {handleClick} closeModal = {closeModal} />
            </Modal>
        }

        </>
    )
}

export default DeleteModal
