import { useContext, useEffect, useState } from 'react'
import { Container, List } from "./styles"
import { BsXLg } from "react-icons/bs";
import { AuthContext } from '../../context/context';
import InputUniversal from '../../components/InputUniversal';

export default function Oficina() {
  const {
    sendOficina,
    listOficina,
    deleteOficina,
    atualizarOficina
  } = useContext(AuthContext)
  const [name, setName] = useState({ id: "", name: "" })
  const [list, setList] = useState([])

  const handleSubmit = async () => {
    if (name) {
      if (name.id) {
        atualizarOficina({
          descricao: name.name,
          id: name.id
        })
      } else {
        sendOficina({ descricao: name.name })
      }

      setName({ id: "", name: "" })
      return await run()
    }

    alert("Campo Oficina vazio! ")
  }

  useEffect(() => {
    run()
  }, [deleteOficina])

  async function run() {
    const res = await listOficina();
    setList(res.data);
  }

  function removerItem({ name, id }) {
    if (window.confirm(`Deseja realmente excluir ${name}?`)) {
      deleteOficina({ id: id })
      limparCampo()
    }
  }

  function limparCampo() {
    setName({ id: "", name: "" })
  }

  return (
    <Container>
      <fieldset>
        <legend>{name.id ? "Atualizar Registro" : "Adicionar Novo"}</legend>
        <InputUniversal
          titulo="Nome da oficina"
          type='text'
          value={name.name}
          placeholder='Digite o nome do oficina...'
          onChange={e => setName({ id: name.id, name: e.target.value })}
          maxLength={35}
        />
        <span>
          <button
            type='button'
            onClick={handleSubmit}
            style={{ background: "#39913d" }}
          >{name.id ? "Atualizar" : "Salvar"}</button>
          {/* {name.id &&
            <button
              type='button'
              onClick={() => removerItem({ name: name.name, id: name.id })}
              style={{ background: "#ca5858" }}
            >Excluir</button>
          } */}
          {
            <button
              type='button'
              onClick={limparCampo}
              style={{ background: "#5886ca" }}
            >Limpar</button>
          }
        </span>
      </fieldset>
      <List >
        <legend>Lista de Oficina</legend>
        {list.map((v, i) =>
          <section
            key={i}
            onClick={() => setName({ id: v.id, name: v.descricao })}
            style={{ background: v.id == name.id ? "#39913d" : "#46545E" }}
          >
            <h4>{v.descricao}</h4>
            {/* <BsXLg color='#ffffff' onClick={() => removerItem({ name: v.descricao, id: v.id })} /> */}
          </section>
        )}
      </List>
    </Container>
  )
}

