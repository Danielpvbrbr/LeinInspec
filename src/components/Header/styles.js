import { styled, keyframes } from 'styled-components';

const msg = keyframes`
  from{
    opacity: 0;
  
  }
  to{
    opacity: 1;
    color: #77F377;
  }
`;

export const Container = styled.div`
  width: 600px;
  height: 40px;
  background-color: #46545E;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid #ffffff;

  @media only screen and (max-width: 600px) {
      width: 100%;
    }
    
  section{
    margin-left: 5px;
    width:37%;
  }

  div{
    width:63%;
  }

  span{
      color: #77F377;
  }

  h4{
      font-size: 25pt;
      color: #fff;
      margin-top: -10px;
  }
  .msg{
    animation: ${msg} 2s linear infinite;
    margin-right: 10px;
    cursor: pointer;
  }

p{
 width: 18px;
 height: 18px;
 display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #fff;
  font-size: 9pt;
  position: relative;
  /* animation: ${msg} 2s linear infinite; */
  right: 8px;
  bottom: 6px;
}
`;
