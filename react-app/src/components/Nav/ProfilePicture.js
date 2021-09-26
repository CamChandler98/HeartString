import styled from "styled-components"
import { Modal } from "../../context/Modal"
import LoginFormModal from "../auth/LoginFormModal"
import LogoutModal from "./LogoutModal"
import { useState } from "react"

const ProfilePictureStyle = styled.div`
    position:relative;

    .profile-pic{
        box-sizing: border-box;
        object-fit: cover;
        border-radius: 50%;
        padding: 5px;
        width:70px;
        height:70px;
        background-color: white;
    }
`
const ProfilePicture = ({user}) => {
    const [showModal, setShowModal] = useState(false)

    const handleClick = () => {

        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }
    return(
        <ProfilePictureStyle>
        <img onClick={handleClick} className = 'profile-pic' src ={user.profile_picture_url} alt= 'logout'/>
        {showModal &&
        <Modal bottom = '95px' left = '75px' backgroundColor = 'transparent' borderRadius= '6px' onClose = {closeModal}>
            <LogoutModal closeModal = {closeModal} user = {user}/>
        </Modal>}
        </ProfilePictureStyle>
    )
}

export default ProfilePicture
