import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 94vh;
  background-color: #D9D9D9;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const List = styled.div`
  width: 100%;
  height: 100%;
  background-color: #D9D9D9;
  flex-direction: column;
  display: flex;
  align-items: center;
  overflow-y: auto;
  gap: 4px;

 &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none; 
  -ms-overflow-style: none;

`;
export const LineNot = styled.div`
  width: 95%;
  background-color: #4a60c2ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  border-radius: 10px;
  margin: 2px;

  p {
    color: #fff;
    font-weight: 300;
    padding: 4px;
    word-break: break-word;
    white-space: pre-wrap;
    line-height: 1.4;
  }

  button {
    width: 100%;
    height: 30px;
    background: #fc4049ff;
    font-size: 13px;
    text-align: center;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

export const Confirm = styled.div`
  width: 455px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #4a60c2ff;
  border-radius: 10px;
  position: fixed;
  bottom:50%;
  gap: 5px;

  svg{
    position: relative;
    right: -210px;

  }

  textarea{
    width: 96%;
    height: 70%;
    font-size: 11pt;
    border-radius: 10px;
  }
  button{
    width: 96%;
    height:40px;
    border-radius: 5px;
    outline: none;
    border: none;
    cursor: pointer;
    background: #77F377;
  }

`;