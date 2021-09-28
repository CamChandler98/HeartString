import React, { useState } from "react";

import { Modal } from "../../context/Modal";
import DeleteProfile from "./DeleteProfile";
import deleteIcon from '../graphics/delete.svg'


const DeleteProfileModal = ({user}) => {
    const [showModal, setShowModal] = useState(false)

    const handleClick = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return(
        <>
        <img onClick = {handleClick} className = 'delete-icon' src = {deleteIcon} alt = 'delete profile' />
        {showModal &&
            <Modal onClose = {() => setShowModal(false)}>
                <DeleteProfile user = {user} closeModal = {closeModal}  />
            </Modal>
        }


        </>
    )
}

export default DeleteProfileModal
