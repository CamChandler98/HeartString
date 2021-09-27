import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAlert } from '../../context/Alert';
import { logout } from '../../store/session';

const LogoutStyle = styled.div`
    .logout-container{
        min-height: 40px;
        min-width: 200px;
        background-color: white;
        display:flex;
        flex-direction:column;
        padding:20px;
        bottom: 10px;
        left: 35px;
        align-items: center;
        border-radius: 20px;
        position:absolute;
        box-shadow: rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px;

    }
    p{
        text-align: center;
        font-size: 16px;
        font-weight: bold;
    }
    .logout-button{
        background-color: #fb6888;
        border: none;
        color: whitesmoke;
        height:40px;
        width:90px;
        border-radius: 15px;

    }
    .logout-button:hover{
        background-color: #da4d6c;
        transform: scale(1.03);
    }

    img{
        height: 50px;
        width: 50px;
        object-fit: cover;
        border-radius: 50%;
        padding: 10px
    }
    a{
        display: flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
        border-radius: 50%;
        padding:10px;

    }
    img:hover{
        background-color: #393e411a;
        cursor: pointer
    }


`
const LogoutModal = ({user, closeModal}) => {

    let history = useHistory()
    const {alertText, setShowAlert ,setAlertText} = useAlert()
    const dispatch = useDispatch()

    const onLogout = async (e) => {
        history.push('/home')
      await dispatch(logout());
      setAlertText('Logged Out')
      setShowAlert(true)
    };
    return(
        <LogoutStyle>
        <div className = 'logout-container'>
            <Link to = {`/users/${user.username}`} onClick = {closeModal}>
            <p>
                {user.display_name}
            </p>
            <img src = {user.profile_picture_url} />
            </Link>
            <p>
                Logout {user.username}?
            </p>
            <button className = 'logout-button' onClick = {onLogout}>
                Logout
            </button>
        </div>
        </LogoutStyle>
    )
}

export default LogoutModal
