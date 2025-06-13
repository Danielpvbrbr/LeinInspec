import { styled } from 'styled-components';

export const Container = styled.div`
  width: 97%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color:#F5F5F5;
  border-radius: 5px;

  input[type=text] {
    width: 95%;
    background-color:#F5F5F5;
    border: 1px solid red;
    border: none;
    margin-right: 4px;
    outline: none;
    padding-left: 10px;
    font-size: 14pt;
  }

  div{
    width: 50px;
    height: 40px;
    background-color:#F5F5F5;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  span{
    display: flex;
    flex-direction: row;
    margin-right: 4px;
    justify-content: center;
    align-items: center;
    gap: 3px;
  }

  span input{
    width: 100px;
    height: 30px;
    border: none;
    background-color:#F5F5F5;
    border: 1px solid #d9d9d9;
    border-radius:5px;
  }
`;
