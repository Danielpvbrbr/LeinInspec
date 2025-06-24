import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: ${p => p.isForm};
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.4);
  position: fixed;
`;

export const Area = styled.section`
    width: 550px;
    height: 99%;
    display: flex;
    flex-direction: column;
    align-items: center ;
    background-color: #d9d9d9;
    border-radius: 5px;

    @media only screen and (max-width: 600px) {
      width: 98%;
    }
`;

export const Header = styled.section`
    width: 100%;
    height: 35px;
    background-color: #D9D9D9;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 3px solid #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    h4{
      font-size: 11pt;
      color: #496B83;
      font-weight: 500;
    }
`;

export const List = styled.section`
    width: 97%;
    height: 69%;
    /* border: 1px solid red; */
    margin-bottom: 2px;
    overflow-y: auto;
`;

export const InfoOption = styled.div`
    width: 97%;
    /* border: 1px solid red; */
    display: flex;
    flex-direction: column;
    gap:2px;
    
    select{
      width: 100%;
      height: 35px;
      border-radius: 5px;
      border: 1px solid #496B83;
      color: #496B83;
    }

    p{
      font-size: 10pt;
      color: #496B83;
    }
`;
export const Line = styled.section`
    width: 100%;
    height: 35px;
    background-color: #F5F5F5;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1px;
    margin-top: 5px;
    border-radius: 5px;

    h4{
      margin-left: 8px;
      color: #496B83;
      font-weight: 400;
    }

    input[type=checkbox]{
      width: 25px;
      height: 25px;
      margin-right: 8px;
      
    }
    
`;
export const LineText = styled.section`
    width: 100%;
    background-color: #F5F5F5;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1px;
    margin-top: 5px;
    border-radius: 5px;

    h4{
      margin: 8px;
      color: #496B83;
      font-weight: 400;
    }

    textarea{
      width: 97%;
      height: 100px;
      margin: 8px;
      resize: none;
      font-size: 12pt;
      padding: 5px;
    }
    
`;
export const Action = styled.div`
    width: 100%;
    height: 75px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */
    gap: 7px;

    button{
      width: 97%;
      height: 35px;
      outline: none;
      border: none;
      border-radius: 5px;
      font-weight: 600;
      color: #fff;
      cursor: pointer;
    }

`;