import React, { useState } from "react";

import { Modal } from "../../context/Modal";
import ManageProfile from "./ManageProfile";



const ManageProfileModal = ({user}) => {
    const [showModal, setShowModal] = useState(false)

    const handleClick = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return(
        <>
        <span onClick = {handleClick}>...</span>
        {showModal &&
            <Modal onClose = {() => setShowModal(false)}>
                <ManageProfile user = {user} closeModal = {closeModal}  />
            </Modal>
        }


        </>
    )
}

export default ManageProfileModal
