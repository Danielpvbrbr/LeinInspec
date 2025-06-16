import { styled } from 'styled-components';

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
    margin-left: 10px;
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
`;
