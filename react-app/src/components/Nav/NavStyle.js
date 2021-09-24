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
        align-items:flex-start;
        gap:30px;
    }
    .nav-item{
        display: flex;
        justify-content: center;
        align-items:center
    }
    .nav-item span{

        font-size: 16px;
    }
`
export default NavStyle
