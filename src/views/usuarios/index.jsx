import { useContext, useEffect, useState } from 'react'
import { Container, AcessoArea, List } from "./styles"
//import { BsXLg } from "react-icons/bs";
import { AuthContext } from '../../context/context';
import InputUniversal from '../../components/InputUniversal';
import { FaChessKing, FaUser } from "react-icons/fa6";

export default function Usuarios() {
  const {
    sendUsuarios,
    listUsuarios,
    deleteUsuarios,
    atualizarUsuarios,

  } = useContext(AuthContext)

  const [user, setUser] = useState({ id: "", user: "" })
  const [password, setPassword] = useState("")
  const [list, setList] = useState([])
  const [liberado, setLiberado] = useState([]);
  const [spand, setSpand] = useState(false);

  const handleSubmit = async () => {
    if (!user.user) {
      alert("Campo Usuário/Senha vazio!");
      return;
    }

    if (user.id) {
      atualizarUsuarios({
        user: user.user,
        password: password,
        id: user.id,
        liberadoArr: JSON.stringify(liberado)
      });
    } else {
      sendUsuarios({
        user: user.user,
        password: password,
        liberadoArr: JSON.stringify(liberado)
      });
    }

    setUser({ id: "", user: "" });
    setPassword("");
    setLiberado([]);
    await run();
  }

  useEffect(() => {
    run()
  }, [deleteUsuarios, liberado])

  async function run() {
    const res = await listUsuarios();
    setList(res);
  }

  // const deleteUser = ({ id, name }) => {
  //   if (window.confirm(`Deseja realmente excluir ${name}?`)) {
  //     deleteUsuarios({ id: id })
  //     limparCampo()
  //   }
  // }

  function limparCampo() {
    setUser({ id: "", user: "" });
    setLiberado([]);
    setPassword("");
  }

  async function handleLiberados(v) {
    if (!(v.user == "admin")) {
      setUser({ id: v.id, user: v.user })
    }
    console.log(JSON.parse(v.liberadoArr).length > 6)
    setLiberado(JSON.parse(v?.liberadoArr))
    await run()
  }

  return (
    <Container>
      <fieldset>
        <legend>{user.id ? "Atualizar Registro" : "Adicionar Novo"}</legend>
        <InputUniversal
          titulo="Usuário"
          type='text'
          value={user.user}
          placeholder='Digite o usuário...'
          onChange={e => setUser({ id: user.id, user: e.target.value })}
          autoComplete="new-username"
          maxLength={10}
        />

        <InputUniversal
          titulo="Senha"
          type='password'
          value={password}
          placeholder='Digite a senha...'
          onChange={e => setPassword(e.target.value)}
          autoComplete="new-password"
          maxLength={6}
        />
        <AcessoArea>
          <legend>Acesso Liberado</legend>

          <section style={{ margin: 2 }}>
            <h4>Inicio</h4>
            <input type='checkbox' checked disabled />
          </section>
          {list?.menu?.map((v, i) =>
            <section style={{ margin: 2, display: spand ? "flex" : "none", }}>
              <h4>{v.descricao}</h4>
              <input
                type='checkbox'
                checked={liberado.includes(v.id)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setLiberado(prev => {
                    if (checked) {
                      return [...prev, v.id];
                    } else {
                      return prev.filter(id => id !== v.id);
                    }
                  });
                }}
              />
            </section>
          )}
          <section
            onClick={() => setSpand(!spand)}
            style={{
              margin: 2,
              justifyContent: "center",
              background: "#ececec",
              cursor: "pointer"
            }}>
            <h4 style={{ textAlign: "center", fontSize: 12 }}>{spand ? "Ver Menos" : "Ver Mais"}</h4>
          </section>
        </AcessoArea>
        <span>
          <button
            type='button'
            onClick={handleSubmit}
            style={{ background: "#39913d" }}
          >
            {user.id ? "Atualizar" : "Salvar"}
          </button>
          {/* {user.id &&
            <button
              type='button'
              onClick={() => deleteUser({ id: user.id, name: user.user })}
              style={{ background: "#ca5858" }}
            >Excluir</button>
          } */}
          <button
            type='button'
            onClick={limparCampo}
            style={{ background: "#5886ca" }}
          >Limpar</button>
        </span>
      </fieldset>

      <List>
        <legend>Lista de Usuários</legend>
        {list?.data?.map((v, i) =>
          <section
            style={{
              background: (JSON.parse(v.liberadoArr).length > 6) || v.tipo == 1 ? "#ff5100" : "#46545E"
            }} key={i} onClick={() => handleLiberados(v)
            }>
            <h4>{v.user}</h4>
            {/* {
              !(v.user == "admin") && <BsXLg color='#ffffff' onClick={() => deleteUser({ id: v.id, name: v.user })} />
            } */}
            {(JSON.parse(v.liberadoArr).length > 6) || v.tipo == 1 ?
              <FaChessKing color='#d9ff00' />
              :
              <FaUser color='#ffffff' />
            }
          </section>
        )}
      </List>
    </Container>
  )
}
