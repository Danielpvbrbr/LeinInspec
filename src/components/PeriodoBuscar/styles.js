import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color:#F5F5F5;
  border-radius: 5px;

  
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

`;
export const InputSearch = styled.input`
    background-color:#F5F5F5;
    border: none;
    margin-right: 4px;
    outline: none;
    padding-left: 10px;
    font-size: 14pt;

`;

export const Area = styled.section`
    width:14rem;
    display: flex;
    flex-direction: row;
    margin-right: 4px;
    justify-content: center;
    align-items: center;
    gap: 3px;
    /* border: 1px solid red; */

  input[type=date]{
    width: 100px;
    height: 30px;
    border: none;
    background-color:#F5F5F5;
    border: 1px solid #d9d9d9;
    border-radius:5px;
    /* border: 1px solid red; */
  }
`;
