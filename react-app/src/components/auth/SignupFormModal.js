import React, { useState } from "react";

import { Modal } from "../../context/Modal";
import SignUpForm from "./SignUpForm";


const SignUpFormModal = () => {
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
        <button onClick={handleClick}>
            SignUp
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
