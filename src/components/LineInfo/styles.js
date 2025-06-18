import { styled } from 'styled-components';

export const Container = styled.div`
  width: 97%;
  min-height: 35px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #ffff;
  border: none;
  outline: none;
  color: #433B3B;
  font-weight: 500;
  font-size: 12pt;
  border-radius: 5px;
  cursor: pointer;

  span{
    width: 97%;
    height: 20px;
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
  }

`;

export const Area = styled.section`
  width: 97%;
  max-height:450px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 5px;
  overflow-y:auto
`;

export const Line = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color:#46545E;
    margin-bottom: 3px;
    border-radius: 4px;

    p{
      color: #fff;
      padding: 5px;
      font-size: 10pt; 
    }
`;
