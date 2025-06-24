import { useContext, useEffect, useState } from 'react'
import { Container, List } from "./styles"
import { BsXLg } from "react-icons/bs";
import { AuthContext } from '../../context/context';
import InputUniversal from '../../components/InputUniversal';

export default function Usuarios() {
  const {
    sendUsuarios,
    listUsuarios,
    deleteUsuarios,
    atualizarUsuarios
  } = useContext(AuthContext)

  const [user, setUser] = useState({ id: "", user: "" })
  const [password, setPassword] = useState("")
  const [list, setList] = useState([])

  const handleSubmit = async () => {
    if (!user.user) {
      alert("Campo Usuário/Senha vazio!");
      return;
    }

    if (user.id) {
      atualizarUsuarios({
        user: user.user,
        password: password,
        id: user.id
      })
    } else {
      sendUsuarios({
        user: user.user,
        password: password
      })
    }

    setUser({ id: "", user: "" })
    setPassword("")
    await run()
  }

  useEffect(() => {
    run()
  }, [deleteUsuarios])

  async function run() {
    const res = await listUsuarios();
    setList(res.data);
  }

  const deleteUser = ({ id, name }) => {
    if (window.confirm(`Deseja realmente excluir ${name}?`)) {
      deleteUsuarios({ id: id })
      limparCampo()
    }
  }

  function limparCampo() {
    setUser({ id: "", user: "" });
    setPassword("");
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

        <span>
          <button
            type='button'
            onClick={handleSubmit}
            style={{ background: "#39913d" }}
          >
            {user.id ? "Atualizar" : "Salvar"}
          </button>
          {user.id &&
            <button
              type='button'
              onClick={() => deleteUser({ id: user.id, name: user.user })}
              style={{ background: "#ca5858" }}
            >Excluir</button>
          }
          <button
            type='button'
            onClick={limparCampo}
            style={{ background: "#5886ca" }}
          >Limpar</button>
        </span>
      </fieldset>

      <List>
        <legend>Lista de Usuários</legend>
        {list.map((v, i) =>
          <section
            style={{
              background: (v.user == "admin")
                && "#000000"
            }} key={i} onClick={() => !(v.user == "admin") && setUser({ id: v.id, user: v.user })}>
            <h4>{v.user}</h4>
            {
              !(v.user == "admin") && <BsXLg color='#ffffff' onClick={() => deleteUser({ id: v.id, name: v.user })} />
            }
          </section>
        )}
      </List>
    </Container>
  )
}
