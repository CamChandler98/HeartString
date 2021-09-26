import React, { useState } from "react";

import { Modal } from "../../context/Modal";
import DemoLogin from "./Demo";
import SignUpForm from "./SignUpForm";


const DemoModal = () => {
    const [showModal, setShowModal] = useState(false)

    const handleClick = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return(
        <>
        <button className='demo-button' onClick={handleClick}>
            Demo
        </button>
        {showModal &&
            <Modal onClose = {() => setShowModal(false)}>
                <DemoLogin onClose = {closeModal} />
            </Modal>
        }


        </>
    )
}

export default DemoModal
