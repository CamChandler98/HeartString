import React, { useState } from "react";

import { Modal } from "../../context/Modal";
import DeleteProfile from "./DeleteProfile";



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
        <span onClick = {handleClick}>Delete Account</span>
        {showModal &&
            <Modal onClose = {() => setShowModal(false)}>
                <DeleteProfile user = {user} closeModal = {closeModal}  />
            </Modal>
        }


        </>
    )
}

export default DeleteProfileModal
