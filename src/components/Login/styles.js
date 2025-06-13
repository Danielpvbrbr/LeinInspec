import { styled } from 'styled-components';

export const Container = styled.div`
  width: 600px;
  height: 100%;
  background-color: #D9D9D9;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Area = styled.div`
  width: 60%;
  height: 300px;
  background-color: #46545E;
  display: flex;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 5px;

  span{
    width: 90%;
  }

  span p{
    font-size: 10pt;
    color: #fff;
    margin-top: 10px;
  }

  input{
    width: 96%;
    height: 40px;
    border-radius:5px;
    outline: none;
    border: none;
    padding-left: 10px;
    font-size: 13pt;
  }

  button{
    width: 90%;
    height: 40px;
    border-radius:5px;
    outline: none;
    border: none;
    font-weight: 600;
    margin-bottom: 25px;
    color:rgb(68, 68, 68);
    cursor: pointer;
    background-color: #77F377;
  }

   h4 span{
      color: #77F377;
    }

    h4{
      font-size: 30pt;
      color: #fff;
    }
`;