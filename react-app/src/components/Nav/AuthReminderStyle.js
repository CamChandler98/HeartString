import styled from "styled-components";

const AuthReminderStyle = styled.div`
.auth-reminder{
    min-height: 70px;
    background-color: #79d0bd;
    position: fixed;
    right: 0px;
    left: 0px;
    bottom: 0px;
    backface-visibility: hidden;
    display: flex;
    padding: 1%;
    justify-content:stretch;
    align-items: center;
    z-index: 3
}

.reminder-text{
    max-width:500px;
    margin-left: 20%;
    margin-right: 2%;
    display: flex;
    flex-direction: column;
    gap:10px;
}

.reminder-text h2{
    color: white;
    font-size: 30px;
    font-weight: bold;
}

.reminder-text span{
    color: white;
    font-size: 18px ;
    font-weight: bold;
}

.auth-buttons{
    display:flex;
    gap:25px;
}

.auth-buttons button{
    height:40px;
    width:90px;
    border-radius: 15px;
    font-size: 16px;
    padding: 1%;
    font-weight: bold;
}

.login-button{
    background-color: transparent;
    border: solid 3px whitesmoke;
    color: whitesmoke;
}
.login-button:hover{
    background-color:rgba(89, 158, 143, 0.138);
    transform: scale(1.03);

}
.signup-button{
    background-color: #fb6888;
    border: none;
    color: whitesmoke;

}
.signup-button:hover{
    background-color: #da4d6c;
    transform: scale(1.03);
}

.demo-button{
    background-color: #e4d374;
    border: none;
    color: whitesmoke;

}
.demo-button:hover{
    background-color: #d2c163;
    transform: scale(1.03);
}

`
export default AuthReminderStyle
