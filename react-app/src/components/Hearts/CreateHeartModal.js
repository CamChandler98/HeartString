import React, { useState } from "react";

import { Modal } from "../../context/Modal";
import CreateHeartForm from "./CreateHeartForm";
import createHeartButton from "../graphics/create-heart-button.svg"


const CreateHeartModal = () => {
    const [showModal, setShowModal] = useState(false)

    const handleClick = () => {
        console.log('opening sign up modal')
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return(
        <>
        <img onClick={handleClick}  src ={createHeartButton} alt= 'post new heart'/>
        {showModal &&
            <Modal  onClose = {() => setShowModal(false)}>
                <CreateHeartForm closeModal = {closeModal} />
            </Modal>
        }


        </>
    )
}

export default CreateHeartModal
