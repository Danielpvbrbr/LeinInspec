import { styled } from 'styled-components';

export const Container = styled.div`
  width: 97%;
  height: 100%;
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

  fieldset section h4{
    margin-left: 10px;
  }
  fieldset section svg{
    margin-right: 10px;
    cursor: pointer;
  }

`;

export const AreaInfo = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* border: 1px solid red; */
  align-items: center;
  gap: 5px;

  input[type=date]{
   width:100px;
   height: 34px;
  }

  div{
    width:100%;
  }

  section input{
    border:1px solid #496B83; 
    color: #496B83;
    border-radius: 5px;
  }

  section p{
    font-size: 10pt;
    color: #496B83;
  }
  

`;

export const List = styled.fieldset`
    height: 480px;
    margin-top: 10px;
    overflow-y: auto;
    /* ::-webkit-scrollbar{
      display: none;
    } */

    section{
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      font-size: 12pt;
      border-radius: 5px;
      background-color: ${p => p.bk};
      color: #fff;
      justify-content: space-between;
      margin-bottom: 3px;
      cursor: pointer;
  }
`;
