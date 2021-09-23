import styled from "styled-components";

const HomeCreateHeartFormStyle = styled.div`
#heart-content{
    resize:none;
    border: none;
    width:500px;
    outline:none;
    background: transparent;
    height: 80px;
    padding-top: 10px;
    padding-bottom: 0px;
    padding-left: 2%;
    font-size: 16px;
    box-sizing: border-box;
    border-bottom: solid 1px #5b626679;
    border-right:solid 1px #5b626679 ;
    border-left: solid 1px #5b626679 ;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    margin-top: 0px
}
.create-heart-form{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    min-width: 500px;
    padding:2% 2%;
    padding-right: 4%;
    gap:5px;
    border-bottom: solid 1px #5b626679;
    margin: 0px;
    padding-top:0px;

}
.camera-button{
    width: 60px;
    height: 60px;
}
.heart-image{
    padding-top:2%;
    width:60px;
    max-height: 60px;
    object-fit: cover;
}
.add-heart-photo{
    display: flex;
    flex-direction: column;
    align-items:center;
    padding-left: 1%;
}
input[type="file"]{
    display: none;
}
.photo-content{
    display: flex;
    align-items: center;
}

.time-dropdown{
    background-color: transparent;
    color:#393e41;
    border:none;
    border-bottom: 1px solid #393e417e;
    outline: none;
    padding: 2%;
    width: 300px;
    font-size: 14px;
    text-align: center;
}
.time-to-live{
    margin-right: auto;
    margin-left: 14.7%;
}
.time-to-live h2{
    color:#393e41;
    font-size: 14px;
}
.time-dropdown option{
    color:#393e41;
    width: 300px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 20px;
}

#five-min{
    background-color: #a2e8d9;
}
#one-hour{
    background-color: #fb6888;
}
#one-day{
    background-color: #ffeb7b;
}

.submit{

    border-radius: 8px;
    border: 0px;
    background-color: #ffeb7b;
    color: #393e41;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 0px;
    margin-top: -40px;
    margin-left: auto;
    margin-right: 11.6%;
    padding: 1.01% 1%
}
.submit:hover{
    background-color: #e1d175;
    transform: scale(1.02);
}

.errors-list{
    margin-top: 3px;

}
.error{
    color: red;
    list-style: none;
    font-size: 20px;
}

.remove-button{
    margin-top: 5px;
    margin-bottom: 5px;
    height: 30px;
    color: rgb(255, 255, 255);
    border: none;
    outline: none;
    background-color: #fb6888;
    font-size: 14px;
    border-radius: 7px;
    text-justify: center;
    font-weight:bold;
}

.remove-button:hover{
    background-color: #e95d7c
}
`

export default HomeCreateHeartFormStyle
