import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
        border-radius: 50%
    }


`
const LogoutModal = ({user}) => {
    const dispatch = useDispatch()
    const onLogout = async (e) => {
      await dispatch(logout());
    };
    return(
        <LogoutStyle>
        <div className = 'logout-container'>
            <Link to = {`/user/${user.username}`}>
            <p>
                profile
            </p>
            <img src = {user.profile_picture_url} />
            </Link>
            <p>
                logout {user.username}?
            </p>
            <button className = 'logout-button' onClick = {onLogout}>
                Logout
            </button>
        </div>
        </LogoutStyle>
    )
}

export default LogoutModal
