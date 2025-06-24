import { styled } from 'styled-components';

export const Container = styled.div`
  width: 97%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
export const AreaForm = styled.fieldset`
  display: flex;
  flex-direction: column;

 span{
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 7px;
    gap: 3px;
  }

  span button{
    width: 50%;
    height: 40px;
    border: none;
    outline: none;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }

   section h4{
    margin-left: 10px;
  }
   section svg{
    margin-right: 10px;
    cursor: pointer;
  }
`;
export const ContainerForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
export const Form = styled.form`
  width: 97%;
`;
export const AreaInput = styled.div`
 width: 100%;
`;

export const AreaPhoto = styled.div`
  width: 200px;
  height: 138px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color:rgb(253, 251, 251);
  border: 1px solid #8f96a3;
  cursor: pointer;

  img{
    width: 99%;
    height: 99%;
    border-radius: 5px;
  }
`;

export const List = styled.fieldset`
    height: 440px;
    margin-top: 10px;
    overflow-y: auto;
    /* ::-webkit-scrollbar{
      display: none;
    } */
    section{
      width: 96%;
      height: 20px;
      display: flex;
      align-items: center;
      font-size: 12pt;
      border-radius: 5px;
      background-color: #46545E;
      color: #fff;
      justify-content: space-between;
      margin-bottom: 3px;
      cursor: pointer;
      padding: 10px;
  }
`;
