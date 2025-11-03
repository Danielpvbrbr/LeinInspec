import { useContext, useState, useEffect } from 'react'
import { Container, Area, Header, ListLine, Line } from "./styles"
import { BsChevronDoubleLeft, BsChevronCompactDown, BsChevronCompactRight } from "react-icons/bs";
import { AuthContext } from '../../context/context';
import { version } from '../../../package.json'

export default function Menu({ isMenu, setisMenu, setMenuSelect }) {
  const { user, logout, isVisible, getNotificacao } = useContext(AuthContext)
  const [isMn, setIsMn] = useState(0)
  const [notificacao, setNotificacao] = useState([]);

  useEffect(() => {
    const run = async () => {
      const { res1, res2 } = await getNotificacao();
      const r1 = res2?.filter(item => item.status === 0);

      setNotificacao(res1?.length + r1.length);
    };

    run();
  }, []);

  const showCadastro = [2, 3, 4, 5].some(isVisible)

  return (
    <Container isMenu={isMenu ? "flex" : "none"}>
      <Area>
        <Header>
          <p style={{
            fontSize: 17,
            textAlign: "center",
            color: "#fff",
            marginBottom: 2
          }}>
            {user?.user}
          </p>
          <BsChevronDoubleLeft
            color='#fff'
            size={25}
            cursor="pointer"
            onClick={() => setisMenu(false)}
          />
        </Header>

        <ListLine>
          <Line>
            <span onClick={() => { setMenuSelect(0); setisMenu(false) }}>
              <h4>Inicio</h4>
            </span>
          </Line>

          {showCadastro &&
            <Line>
              <span onClick={() => setIsMn(isMn === 1 ? 0 : 1)}>
                <h4>Cadastro</h4>
                {isMn === 1
                  ? <BsChevronCompactDown color='#496B83' />
                  : <BsChevronCompactRight color='#496B83' />
                }
              </span>

              {isMn === 1 &&
                <>
                  {isVisible(2) &&
                    <p onClick={() => { setMenuSelect(1); setisMenu(false) }}>Motoristas</p>
                  }
                  {isVisible(3) &&
                    <p onClick={() => { setMenuSelect(2); setisMenu(false) }}>Veículos</p>
                  }
                  {isVisible(4) &&
                    <p onClick={() => { setMenuSelect(3); setisMenu(false) }}>Grupo de Checklist</p>
                  }
                  {isVisible(5) &&
                    <p onClick={() => { setMenuSelect(4); setisMenu(false) }}>Oficinas</p>
                  }
                </>
              }
            </Line>
          }

          {isVisible(6) &&
            <Line>
              <span onClick={() => { setMenuSelect(5); setisMenu(false) }}>
                <h4>Usuário</h4>
              </span>
            </Line>
          }

          {isVisible(7) &&
            <Line>
              <span onClick={() => { setMenuSelect(6); setisMenu(false) }}>
                <h4>Manutenção</h4>
              </span>
            </Line>
          }

          {isVisible(8) &&
            <Line>
              <span onClick={() => { setMenuSelect(7); setisMenu(false) }}>
                <h4>Notificar Defeito</h4>
              </span>
            </Line>
          }

          {isVisible(9) &&
            <Line>
              <span onClick={() => { setMenuSelect(8); setisMenu(false) }}>
                <h4>Checar Veículo</h4>
              </span>
            </Line>
          }

          {isVisible(10) &&
            <Line >
              <span className={notificacao > 0 && 'notfy'} onClick={() => { setMenuSelect(9); setisMenu(false) }}>
                <h4>Notificação</h4>
                <p style={{
                  width: "18px",
                  height: "18px",
                  display: "flex",
                  padding: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  backgroundColor: "#c52b05",
                  fontSize: "9pt",
                  fontWeight: 20,
                  color: "#fff",
                  marginRight: "10px",
                  border: "none"
                }}>{notificacao}</p>
              </span>
            </Line>
          }

          {isVisible(11) &&
            <Line>
              <span onClick={() => { setMenuSelect(10); setisMenu(false) }}>
                <h4>Abastecimento</h4>
              </span>
            </Line>
          }
        </ListLine>

        {/* <section>
          <p style={{
            fontSize: 17,
            textAlign: "center",
            color: "#fff",
            marginBottom: 2
          }}>
            {user?.user}
          </p>
        </section> */}

        <Line>
          <span onClick={() => { logout(); setisMenu(false) }}>
            <h4>Trocar Usuário</h4>
            <strong style={{ fontSize: 10, marginRight: 3, color: "#5f5c5c" }}>
              {version}
            </strong>
          </span>
        </Line>
      </Area>
    </Container >
  )
}
