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