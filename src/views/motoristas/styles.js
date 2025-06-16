import { styled } from 'styled-components';

export const Container = styled.div`
  width: 97%;
  height: 100%;
  display: flex;
  flex-direction: column;

  fieldset{
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
  
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

fieldset section{
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 12pt;
  border-radius: 5px;
  background-color: #46545E;
  color: #fff;
  justify-content: space-between;
  margin-bottom: 3px;
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

export const Input = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border:1px solid #fff;
  background-color: #fff;
  border-radius: 5px;
  
  input{
    width: 100%;
    height: 40px;
    font-size: 12pt;
    padding-left:10px ;
    border: none;
    outline:none;
    margin-right: 4px;
  }
  h4{
    margin-right: 4px;
    font-size: 10pt;
  }
`;
