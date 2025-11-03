import { useContext, useState } from 'react'
import styled from 'styled-components'
import Menu from './components/Menu';
import Header from './components/Header';
import Inicio from './views/inicio';
import Motoristas from './views/motoristas';
import Veiculos from './views/veiculos';
import Checklist from './views/checklist';
import CheckoutAbastec from './components/CheckoutAbastec'
import Usuarios from './views/usuarios';
import Manutencao from './views/manutencao';
import Oficina from './views/oficina';
import NotificarDefeito from './views/notificarDefeito';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Verificar from './views/verificar';
import Notificacao from './views/notificacao';
import usePWAInstall from './components/usePWAInstall';

import { AuthContext } from './context/context';
import VerificarAbastecimento from './views/verificarAbastecimento';

export default function App() {
  const { isAuthenticated } = useContext(AuthContext)
  const [isMenu, setisMenu] = useState(false)
  const [isForm, setIsForm] = useState(false)
  const [isForm2, setIsForm2] = useState(false)
  const [menuSelect, setMenuSelect] = useState(0)
  const { canInstall, installApp } = usePWAInstall();

  const active = () => {
    switch (menuSelect) {
      case 0:
        return <Inicio setIsForm={setIsForm} />
      case 1:
        return <Motoristas />
      case 2:
        return <Veiculos />
      case 3:
        return <Checklist />
      case 4:
        return <Oficina />
      case 5:
        return <Usuarios />
      case 6:
        return <Manutencao />
      case 7:
        return <NotificarDefeito />
      case 8:
        return <Verificar setIsForm={setIsForm} />
      case 9:
        return <Notificacao />
      case 10:
        return <VerificarAbastecimento setIsForm2={setIsForm2} isForm2={isForm2}/>
    }
  }

  return (
    <Container bgAuth={isAuthenticated}>
      {isAuthenticated ?
        <>
          <Header
            onClick={() => setisMenu(!isMenu)}
          />
          <Area>
            {active()}
          </Area>
          <Menu
            isMenu={isMenu}
            setisMenu={setisMenu}
            setMenuSelect={setMenuSelect}
          />
          <Checkout
            isForm={isForm}
            setIsForm={setIsForm}
          />
          <CheckoutAbastec
            isForm2={isForm2}
            setIsForm2={setIsForm2}
          />
        </>
        :
        <>
          <Login />
          {canInstall && (
            <button onClick={installApp} style={{
              padding: "10px 20px",
              borderRadius: "8px",
              background: "#1976d2",
              color: "#fff",
              border: "none",
              cursor: "pointer"
            }}>
              Instalar App
            </button>
          )}
        </>

      }
    </Container >
  )
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${(el) => el.bgAuth ? "#000000" : "#fff"};
  /* border: 1px solid red; */
`;

const Area = styled.div`
  width: 600px;
  height: 100%;
  background-color: #D9D9D9;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 600px) {
      width: 100%;
  }
`;

