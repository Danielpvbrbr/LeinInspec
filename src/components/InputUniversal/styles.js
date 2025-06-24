import { styled } from 'styled-components';

export const Container = styled.div`

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