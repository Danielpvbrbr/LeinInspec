import { styled } from 'styled-components';

export const Container = styled.div`
  width: 97%;
  height: 99%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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

export const ListServico = styled.div`
    width: 98%;
    max-height: 300px;
    overflow-y: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 5px;
    gap: 4px;
    margin-top: 4px;
    border-radius: 5px;
    border: 1px solid #fff;
`;

export const Line = styled.div`
    width: 98%;
    height: 20px;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    background-color: #fff;
    border-radius: 5px;
    cursor: pointer;
    
    span{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 135px;
      margin:0 ;
    }

     span input[type=date]{
        width: 96px; 
        height: 100%;
        border: none;
    }
    svg{
      cursor: pointer;
    }
    p{
      width: 100%;
    }
`;

export const AreaServic = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* border: 1px solid red; */
  align-items: center;
  gap: 7px;
   
  input[type=date]{
    width:102px;
    height: 40px;
    background-color: #fff;
    border: none;
  }

  div{
    width:100%;
  }

  section{
   margin-top: 7px;
  }

  section input,div{
    font-size: 10pt;
    color: #496B83;
    border-radius: 5px;
  }

  section p{
    font-size: 10pt;
    color: #496B83;
  }
  svg{

    margin-top: 1.5rem;
    border-radius: 5px;
  }
`;

export const ButtonList = styled.button`
    height: 35px;
    background-color: #496B83;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;
export const InputKM = styled.input`
  width: 100px;
  height: 35px;
  border: 1px solid #496B83;
  border-radius: 5px;
  outline: none;
  padding-left: 3px;

`;