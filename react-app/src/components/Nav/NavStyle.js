import styled from "styled-components";

const NavStyle = styled.nav`

    background-color: #fb6888;
    min-width: 100px;
    padding: 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position:relative;
    img{
        padding: 0px;
        width:40px;
        height:40px;
    }
    .nav-items{
        position:fixed;
        display: flex;
        flex-direction: column;
        height:100%;
        justify-content: space-around;
        align-items: center;
    }
    .top{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap:30px;
        padding: 2%
    }
    .nav-item{
        display: flex;
        justify-content: center;
        align-items:center;
        flex-direction: column;
    }
    .nav-item:hover{
        cursor:pointer;
    }
    .nav-item span{
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        text-align: center;
    }

    .top a{
        text-decoration: none;
        margin: 0 auto;
        display: flex;
        align-items: center;
        gap: 5px;
        flex-direction: column;
    }
`
export default NavStyle
