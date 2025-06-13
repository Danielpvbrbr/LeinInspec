import { useContext, useEffect, useState } from 'react'
import { Container, Input } from "./styles"
import { BsXLg } from "react-icons/bs";
import { AuthContext } from '../../context/context';

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
    setUser({ id: "", user: "" });
  }
  const deleteUser = (id) => {
    if (window.confirm("Deseja realmente deletar esse usuário?")) {
      deleteUsuarios({ id: id })
    }
  }

  return (
    <Container>
      <fieldset>
        <legend>{user.id ? "Atualizar Registro" : "Adicionar Novo"}</legend>

        <p>Usuário</p>
        <Input
          style={{
            backgroundColor: user.id ? "#89a0c2" : "#fff",
            color: user.id ? "#ffffff" : "#000000",
            marginBottom: 3
          }}>
          <input
            type='text'
            value={user.user}
            placeholder='Digite o usuário...'
            onChange={e => setUser({ id: user.id, user: e.target.value })}
            autoComplete="new-username"
            maxLength={10}
          />
          {user.id && <h4>{user.id}</h4>}
        </Input>

        <p>Senha</p>
        <Input
          style={{
            backgroundColor: user.id ? "#89a0c2" : "#fff",
            color: user.id ? "#ffffff" : "#000000"
          }}>
          <input
            type='password'
            value={password}
            placeholder='Digite a senha...'
            onChange={e => setPassword(e.target.value)}
            autoComplete="new-password"
            maxLength={6}
          />
          {user.id && <h4>{user.id}</h4>}
        </Input>

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
              onClick={() => deleteUser(user.id)}
              style={{ background: "#ca5858" }}
            >Excluir</button>
          }
          <button
            type='button'
            onClick={() => {
              setUser({ id: "", user: "" });
              setPassword("");
            }}
            style={{ background: "#5886ca" }}
          >Limpar</button>
        </span>
      </fieldset>

      <fieldset>
        <legend>Lista de Usuários</legend>
        {list.map((v, i) =>
          <section style={{ background: (v.user == "admin") && "#000000" }} key={i} onClick={() => !(v.user == "admin") && setUser({ id: v.id, user: v.user })}>
            <h4>{v.user}</h4>
            {
              !(v.user == "admin") && <BsXLg color='#ffffff' onClick={() => deleteUser(v)} />
            }
          </section>
        )}
      </fieldset>
    </Container>
  )
}
