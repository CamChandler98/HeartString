import styled from "styled-components";

const FormStyle = styled.div`
background-color:red
.form-container {
    width: 500px;
    height: auto;
    display: flex;
    flex-direction: column;
    background-color: rgb(245, 245, 245);
    padding: 10% 10%;
    gap: 10px;
    box-shadow: 2px 2px 1px 0px rgba(68, 67, 67, 0.623);
    box-sizing: border-box;
    border-radius: 3px;
}
.form-container h2 {
    text-align: center;
    margin: 5px 10px 25px;
}
.form-header{
    color: black;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}
.form-group {
    display: flex;
    flex-direction: column;
    margin: 1% 5%;
    padding: 2%;
    font-size: 24px;
}
.form-group label{
    font-size: 19px;
}
.form-fields{
    display:flex;
    margin:0;
    gap:20px;

}
.field-child{
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.form-group:focus-within{
    color: #fb6888;
    border-color: #fb6888
}
.form-control {
    margin: 0px 0px 0px ;
    border: none;
    background: transparent;
    border-bottom: 1px solid rgb(32, 30, 30);
    height: 40px;
    font-size: 16px;
    box-sizing: border-box;
    outline: none;
}
.form-control:focus {
    border-color: #fb6888
}
.profile-pic-container{
    display: flex;
    justify-content: center;
    align-items: center;
    padding:0px;
}
.profile-pic{

    box-sizing: border-box;
    object-fit: cover;
    border-radius: 50%;
    padding: 0px;
    width:90px;
    height:90px;

}
.placeholder{
    margin:2%;
    width:90px;
    height: 90px;
    object-fit: cover;
  }
  .remove{
    height: 20px;
    width: 20px;
    margin:0;
    align-self: flex-end;
    margin-bottom: 2px;
    margin-left: -15px;
  }

  .remove:hover{
      filter: invert(50%) sepia(86%) saturate(1211%) hue-rotate(311deg) brightness(105%) contrast(97%);
  }

.errors-list{
    margin-top: 3px;
}
.error{
    color: red;
    list-style: none;
}

`

export default FormStyle
