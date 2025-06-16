import { useContext, useState } from 'react'
import styled from 'styled-components'
import Menu from './components/Menu';
import Header from './components/Header';
import Inicio from './views/inicio';
import Motoristas from './views/motoristas';
import Veiculos from './views/veiculos';
import Checklist from './views/checklist';
import Usuarios from './views/usuarios';
import Checkout from './components/Checkout';
import Login from './components/Login';
import { AuthContext } from './context/context';

export default function App() {
  const { isAuthenticated } = useContext(AuthContext)
  const [isMenu, setisMenu] = useState(false)
  const [isForm, setIsForm] = useState(false)
  const [menuSelect, setMenuSelect] = useState(0)

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
        return <Usuarios />
    }
  }

  return (
    <Container>
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
        </>
        :
        <Login />
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

