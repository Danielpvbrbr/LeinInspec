import { useState, useContext, useEffect } from 'react'
import { Container, Input } from "./styles"
import { BsXLg } from "react-icons/bs";
import { AuthContext } from '../../context/context';

export default function Veículos() {
  const {
    sendVeiculo,
    listVeiculo,
    deleteVeiculo,
    atualizarVeiculo
  } = useContext(AuthContext)

  const [name, setName] = useState({ id: "", name: "" })
  const [placa, setPlaca] = useState("")
  const [list, setList] = useState([])

  const handleSubmit = async () => {
    if (name) {
      if (name.id) {
        atualizarVeiculo({
          descricao: name.name,
          placa: placa.toLocaleUpperCase(),
          id: name.id
        })
      } else {
        sendVeiculo({
          descricao: name.name,
          placa: placa.toLocaleUpperCase()
        })
      }

      setName({ id: "", name: "" })
      setPlaca("")
      return await run()
    }

    alert("Campo veiculo/placa vazio! ")
  }

  useEffect(() => {
    run()
  }, [deleteVeiculo])

  async function run() {
    const res = await listVeiculo();
    setList(res.data);
    setName({ id: "", name: "" })
    setPlaca("")
  }

  return (
    <Container>
      <fieldset>
        <legend>{name.id ? "Atualizar Registro" : "Adicionar Novo"}</legend>

        <p>Nome do Veiculo *</p>
        <Input style={{
          backgroundColor: name.id ? "#89a0c2" : "#fff",
          color: name.id ? "#ffffff" : "#000000"
        }}>
          <input
            type='text'
            value={name.name}
            placeholder='Digite o nome do Veiculo...'
            onChange={e => setName({ id: name.id, name: e.target.value })}

          />
          {name.id &&
            <h4>{name.id}</h4>
          }
        </Input>

        <p>Placa do Veiculo</p>
        <Input style={{
          backgroundColor: name.id ? "#89a0c2" : "#fff",
          color: name.id ? "#ffffff" : "#000000"
        }}>
          <input
            type='text'
            value={placa.toLocaleUpperCase()}
            placeholder='Digite a placa do Veículo...'
            onChange={e => setPlaca(e.target.value)}
            maxLength={7}
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
              onClick={() => deleteVeiculo({ id: name.id })}
              style={{ background: "#ca5858" }}
            >Excluir</button>
          }
          {
            <button
              type='button'
              onClick={() => { setName({ id: "", name: "" }), setPlaca("") }}
              style={{ background: "#5886ca" }}
            >Limpar</button>
          }
        </span>
      </fieldset>
      <fieldset >
        <legend>Lista de Veículos</legend>
        {list.map((v, i) =>
          <section onClick={() => {
            setName({ id: v.id, name: v.descricao }),
              setPlaca(v.placa)
          }}>
            <h4>{v.descricao} - ({v.placa})</h4>
            <BsXLg color='#ffffff' onClick={() => deleteVeiculo({ id: v.id })} />
          </section>
        )}
      </fieldset>
    </Container>
  )
}

