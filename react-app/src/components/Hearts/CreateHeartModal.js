import React, { useState } from "react";

import { Modal } from "../../context/Modal";
import CreateHeartForm from "./CreateHeartForm";

import createHeartButton from "../graphics/create-heart-button.svg"
import CreateHeartFormStyle from "./CreateHeartFormStyle";


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
                <CreateHeartFormStyle>
                <CreateHeartForm closeModal = {closeModal} />
                </CreateHeartFormStyle>
            </Modal>
        }

        </>
    )
}

export default CreateHeartModal
