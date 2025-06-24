import { styled } from 'styled-components';

export const Container = styled.div`
  width:100%;
  background-color: ${p => p.bk};
  border-radius: 5px;
  margin-bottom: 5px;

  div span{
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    margin-top: 1px;
  }
  h5{
    width:65px;
    display: flex;
    gap: 10px;
  }
`;
