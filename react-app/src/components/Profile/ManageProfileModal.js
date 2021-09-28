import React, { useState } from "react";

import { Modal } from "../../context/Modal";
import DeleteProfileModal from "./DeleteProfileModal";
import ManageProfile from "./ManageProfile";
import settingsIcon from '../graphics/settings.svg'


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
        <img onClick = {handleClick} className = 'edit-icon'src= {settingsIcon} alt = 'edit profile' />
        {showModal &&
            <Modal onClose = {() => setShowModal(false)}>
                <ManageProfile user = {user} closeModal = {closeModal}  />
            </Modal>
        }


        </>
    )
}

export default ManageProfileModal
