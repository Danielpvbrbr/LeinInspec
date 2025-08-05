import { styled, keyframes } from 'styled-components';
const animation = keyframes`
  10%{
    background-color: #ffc508ff;
  }
  50%{
    background-color: #ff9408ff;
  }
  100%{
    background-color: #ffc508ff;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: ${p => p.isMenu};
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.0);
  position: fixed;
  transition: 2s;
`;

export const Area = styled.section`
    width: 230px;
    height: 100%;
    margin-left: -370px;
    background-color:rgba(70, 84, 94, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: -2px;
    border-right:1px solid #fff;

   @media only screen and (max-width: 600px) {
      width: 50%;
      margin-left: -50%;
   }
`;

export const Header = styled.section`
    width: 97%;
    height: 47px;
    background-color:rgba(0, 0, 0, 0);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 3px;
    border-bottom: 3px solid #fff;

    span{
      color: #77F377;
    }

    h4{
      font-size: 15pt;
      color: #fff;
    }
`;

export const ListLine = styled.section`
    width: 100%;
    height: 100%;

    .notfy{
      animation: ${animation} 1s linear infinite;
    }
`;

export const Line = styled.section`
    width: 100%;
    background-color: #F5F5F5;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    margin-bottom: 2px;
    
    span{
      min-height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #D9d9d9;
    }

    span h4{
      letter-spacing: 1px;
      color: #496B83;
      margin-left: 8px;
      font-style: oblique;
    }
    span svg{
      margin-right: 9px;
    }
    p{
      border-top: 1px solid #fff;
      border-bottom: 1px solid #fff;
      height: 30px;
      margin-left: 6px;
      color: #46545E;
      font-style: oblique;
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    
`;