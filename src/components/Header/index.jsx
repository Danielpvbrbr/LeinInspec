import { useState, useEffect, useContext } from 'react';
import { Container } from "./styles";
import { BsList, BsFillEnvelopeFill } from "react-icons/bs";
import { AuthContext } from '../../context/context';

export default function Header({ onClick }) {
  const { isVisible, getNotificacao } = useContext(AuthContext);
  const [notificacao, setNotificacao] = useState([]);

  useEffect(() => {
    const run = async () => {
      const { res1, res2 } = await getNotificacao();
      const r1 = res2?.filter(item => item.status === 0);
      setNotificacao(res1?.length + r1?.length);
    };

    run();
  }, []);

  return (
    <Container>
      <section>
        <BsList
          fontSize={35}
          color='#fff'
          cursor="pointer"
          onClick={onClick}
        />
      </section>
      <div>
        <h4><span>Eye</span>Check</h4>
      </div>
      {isVisible(10) &&
        <div className="notification">
          <BsFillEnvelopeFill size={30} color='#fff' className='msg' />
          {notificacao > 0 && (
            <span className="badge">{notificacao}</span>
          )}
        </div>
      }

    </Container>
  );
}
