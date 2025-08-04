import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100%; 
  flex-direction: column;

  legend{
    text-align: center;
  }
`;

export const Header = styled.div`

`;

export const List = styled.div`
    height: 90%;
    overflow-y: auto;

    section{
      width: 99%;
      /* height: 50px; */
      display: flex;
      align-items: center;
      font-size: 12pt;
      color: #fff;
      justify-content: space-between;
  
      cursor: pointer;
  }

  h4{
    font-size: 10pt;
    margin: 5px;
    font-weight: 400;
  }

  section{
    width:99.9%;
    
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