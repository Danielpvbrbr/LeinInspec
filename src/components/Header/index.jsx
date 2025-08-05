import { useState, useEffect, useContext } from 'react';
import { Container } from "./styles";
import { BsList, BsFillEnvelopeFill } from "react-icons/bs";
import { AuthContext } from '../../context/context';

export default function Header({ onClick }) {
  const { notificacao, isVisible } = useContext(AuthContext);
  const notificacoesPendentes = notificacao.filter(item => item.status === 0);

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
          {notificacoesPendentes.length > 0 && (
            <span className="badge">{notificacoesPendentes.length}</span>
          )}
        </div>
      }

    </Container>
  );
}
