import React, { useState } from "react";

import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";


const LoginFormModal = () => {
    const [showModal, setShowModal] = useState(false)

    const handleClick = () => {
   
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return(
        <>
        <button className = 'login-button' onClick={handleClick}>
            Login
        </button>
        {showModal &&
            <Modal onClose = {() => setShowModal(false)}>
                <LoginForm closeModal = {closeModal}/>
            </Modal>
        }


        </>
    )
}

export default LoginFormModal
