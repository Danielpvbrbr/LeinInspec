import { useContext, useState } from 'react'
import { Container, Area, Header, ListLine, Line } from "./styles"
import { BsChevronDoubleLeft, BsChevronCompactDown, BsChevronCompactRight } from "react-icons/bs";
import { AuthContext } from '../../context/context';

export default function Menu({ isMenu, setisMenu, setMenuSelect }) {
  const { user, logout } = useContext(AuthContext)
  const [isMn, setIsMn] = useState(0)

  return (
    <Container isMenu={isMenu ? "flex" : "none"}>
      <Area>
        <Header>
          <h4><span>Lein</span>Inspec</h4>
          <BsChevronDoubleLeft
            color='#fff'
            size={25}
            cursor="pointer"
            onClick={() => setisMenu(false)}
          />
        </Header>
        <ListLine>
          <Line>
            <span onClick={() => { setMenuSelect(0), setisMenu(false) }}>
              <h4>Inicio</h4>
            </span>
          </Line>
          <Line>
            <span onClick={() => { setIsMn(isMn == 1 ? 0 : 1) }}>
              <h4>Cadastro</h4>
              {isMn == 1 ?
                <BsChevronCompactDown color='#496B83' />
                :
                <BsChevronCompactRight color='#496B83' />
              }
            </span>
            {isMn == 1 &&
              <>
                <p onClick={() => { setMenuSelect(1), setisMenu(false) }}>Motoristas</p>
                <p onClick={() => { setMenuSelect(2, setisMenu(false)) }}>Veiculos</p>
                <p onClick={() => { setMenuSelect(3), setisMenu(false) }}>Grupo de Checklist</p>
              </>
            }
          </Line>

          <Line>
            <span onClick={() => { setMenuSelect(4), setisMenu(false) }}>
              <h4>Usuário</h4>
            </span>
          </Line>
        </ListLine>
        <section>
          <p
            style={{
              fontSize: 17,
              textAlign: "center",
              color: "#fff",
              marginBottom: 2

            }}>{user?.user} </p>
        </section>
        <Line>
          <span onClick={() => { logout(), setisMenu(false) }}>
            <h4>Trocar Usúario</h4>
          </span>
        </Line>
      </Area>
    </Container>
  )
}

