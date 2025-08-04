import { useContext, useEffect, useState } from 'react'
import { Container, List } from "./styles"
import LineInfo from '../../components/LineInfo';
import { AuthContext } from '../../context/context';

export default function Notificacao() {
  const { setListCheck } = useContext(AuthContext);

  useEffect(() => {
    const run = async () => {
      // const res = await listCheckout();
      // setListCheck(res.data);
    };
    run();
  }, []);

  return (
    <Container>
      <List>
        {/* {filtrados.map((v, i) =>
          <LineInfo
            key={i}
            data={v}
          />
        )} */}
      </List>
      <button onClick={() => { }} />
    </Container>
  );
}
