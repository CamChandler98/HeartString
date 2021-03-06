import React, { useState } from "react";

import { Modal } from "../../context/Modal";
import SignUpForm from "./SignUpForm";


const SignUpFormModal = () => {
    const [showModal, setShowModal] = useState(false)

    const handleClick = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return(
        <>
        <button className='signup-button' onClick={handleClick}>
            Sign Up
        </button>
        {showModal &&
            <Modal onClose = {() => setShowModal(false)}>
                <SignUpForm closeModal = {closeModal}/>
            </Modal>
        }


        </>
    )
}

export default SignUpFormModal
