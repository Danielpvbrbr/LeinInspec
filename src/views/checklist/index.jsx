import { useContext, useEffect, useState } from 'react'
import { Container, List, Input } from "./styles"
import { BsXLg } from "react-icons/bs";
import { AuthContext } from '../../context/context';

export default function Checklist() {
  const {
    sendGrupo,
    listGrupo,
    deleteGrupo,
    atualizarGrupo
  } = useContext(AuthContext)
  const [name, setName] = useState({ id: "", name: "" })
  const [list, setList] = useState([])

  const handleSubmit = async () => {
    if (name) {
      if (name.id) {
        atualizarGrupo({
          descricao: name.name,
          id: name.id
        })
      } else {
        sendGrupo({ descricao: name.name })
      }

      setName({ id: "", name: "" })
      return await run()
    }

    alert("Campo Item vazio! ")
  }

  useEffect(() => {
    run()
  }, [deleteGrupo])

  async function run() {
    const res = await listGrupo();
    setList(res.data);
    setName({ id: "", name: "" })
  }

  return (
    <Container>
      <fieldset>
        <legend>{name.id ? "Atualizar Registro" : "Adicionar Novo"}</legend>
        <p  style={{marginTop:3,marginBottom:3}}>Nome do Item</p>
        <Input style={{
          backgroundColor: name.id ? "#89a0c2" : "#fff",
          color: name.id ? "#ffffff" : "#000000"
        }}>
          <input
            type='text'
            value={name.name}
            placeholder='Digite o nome do Motorista...'
            onChange={e => setName({ id: name.id, name: e.target.value })}

          />
          {name.id &&
            <h4>{name.id}</h4>
          }
        </Input>

        <span>
          <button
            type='button'
            onClick={handleSubmit}
            style={{ background: "#39913d" }}
          >{name.id ? "Atualizar" : "Salvar"}</button>
          {name.id &&
            <button
              type='button'
              onClick={() => deleteGrupo({ id: name.id })}
              style={{ background: "#ca5858" }}
            >Excluir</button>
          }
          {
            <button
              type='button'
              onClick={() => setName({ id: "", name: "" })}
              style={{ background: "#5886ca" }}
            >Limpar</button>
          }
        </span>
      </fieldset>

      <List bk={""}>
        <legend>Lista de Itens</legend>
        {list.map((v, i) =>
          <section
            key={i}
            onClick={() => setName({ id: v.id, name: v.descricao })}
            style={{ background: v.id == name.id ? "#39913d" : "#46545E" }}
          >
            <h4>{v.descricao}</h4>
            <BsXLg color='#ffffff' onClick={() => deleteGrupo({ id: v.id })} />
          </section>
        )}
      </List>
    </Container>
  )
}

