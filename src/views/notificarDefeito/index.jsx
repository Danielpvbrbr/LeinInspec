import { useContext, useEffect, useState } from 'react'
import { Container, List, LineText } from "./styles"
import { BsXLg } from "react-icons/bs";
import { AuthContext } from '../../context/context';
import InputUniversal from '../../components/InputUniversal';
import SelectVeiculo from '../../components/SelectVeiculo';
import { formatDate } from '../../components/functions/formatDate';

export default function notificarDefeito() {
  const {
    user,
    sendDefeito,
    listDefeito,
    deleteMotorista,
    atualizarDefeito
  } = useContext(AuthContext)
  const [name, setName] = useState({ id: "", name: "" })
  const [list, setList] = useState([])
  const [veiculo, setVeiculo] = useState("")
  const [placa, setPlaca] = useState("")

  const handleSubmit = async () => {
    if (name.name.length < 10) {
      return alert("Ops! Parece que esta tentando salvar um observação menor, descreva mais um pouco! ")
    }
    if (veiculo) {
      if (name.id) {
        await atualizarDefeito({
          descricao: name.name,
          veiculo: veiculo,
          placa: placa,
          responsavel: user.user,
          id: name.id
        })
      } else {
        await sendDefeito({
          descricao: name.name,
          veiculo: veiculo,
          placa: placa,
          responsavel: user.user,
          dataCreate: formatDate(),
        })
      }
      limparCampo()
      const res = await listDefeito();
      setList(res.data);
    } else {
      alert("Favor Preencher os campos que tem o *")
    }
  }

  useEffect(() => {
    run()
  }, [deleteMotorista])

  async function run() {
    const res = await listDefeito();
    setList(res.data);
  }

  function removerItem({ name, id }) {
    if (window.confirm(`Deseja realmente excluir ${name}?`)) {
      deleteDefeito({ id: id })
      limparCampo()
    }
  }

  function limparCampo() {
    setName({ id: "", name: "" })
    setVeiculo("")
  }


  function getValues(v) {
    setName({ id: v.id, name: v.descricao })
    setVeiculo(v.veiculo)
    setPlaca(v.placa)
  }

  const dateFormat = (date) => {
    if (date) {
      const [ano, mes, dia] = date.split("-")
      return (`${dia}/${mes}/${ano}`)
    }

    return "Sem Data"
  }


  return (
    <Container>
      <fieldset>
        <legend>{name.id ? "Atualizar Registro" : "Adicionar Novo"}</legend>
        <SelectVeiculo
          veiculo={veiculo}
          setVeiculo={setVeiculo}
          setPlaca={setPlaca}
        />
        {/* <InputUniversal
          titulo="Defeito"
          type='text'
          value={name.name}
          placeholder='Digite o defeito...'
          onChange={e => setName({ id: name.id, name: e.target.value })}
          maxLength={35}
        /> */}
        <LineText>
          <h4>Obervação/Defeito</h4>
          <textarea
            type='checkbox'
            placeholder='Digite sua observação, maior que 10 Caracteres'
            maxLength={200}
            value={name.name}
            onChange={e => setName({ id: name.id, name: e.target.value })}
          />
        </LineText>
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
      <List>
        <legend>Notificação de defeito</legend>

        <h3 style={{ color: "#ff8800", margin: "10px 0" }}>Pendentes</h3>
        {list.filter(v => !Boolean(v.status)).map((v, i) => (
          <section
            key={`pendente-${i}`}
            onClick={() => getValues(v)}
            style={{
              background: v.id == name.id ? "#39913d" : "#46545E",
              marginBottom: 8,
            }}
          >
            <span>
              <p>Responsável</p>
              <p style={{ fontSize: 13 }}>{v.responsavel}</p>
            </span>

            <span>
              <p>Veículo</p>
              <p style={{ fontSize: 13 }}>{v.veiculo}</p>
            </span>

            <span>
              <p>Defeito</p>
              <p style={{ fontSize: 13 }}>
                {(v.descricao ?? "").toString().slice(0, 80)}
              </p>
            </span>

            <span>
              <p>Data</p>
              <p style={{ fontSize: 13 }}>{dateFormat(v.dataCreate)}</p>
            </span>

            <span>
              <p>Status</p>
              <p style={{ fontSize: 13, color: "#ff8800" }}>Pendente</p>
            </span>

          </section>
        ))}

        <h3 style={{ color: "#3bbb41", margin: "20px 0 10px" }}>Resolvidos</h3>
        {list.filter(v => Boolean(v.status)).map((v, i) => (
          <section
            key={`resolvido-${i}`}
            style={{
              background: v.id == name.id ? "#11ec1c" : "#46545E",
              marginBottom: 8,
            }}
          >
            <span>
              <p>Responsável</p>
              <p style={{ fontSize: 13 }}>{v.responsavel}</p>
            </span>

            <span>
              <p>Veículo</p>
              <p style={{ fontSize: 13 }}>{v.veiculo}</p>
            </span>

            <span>
              <p>Defeito</p>
              <p style={{ fontSize: 13 }}>
                {(v.descricao ?? "").toString().slice(0, 80)}
              </p>
            </span>

            <span>
              <p>Data</p>
              <p style={{ fontSize: 13 }}>{dateFormat(v.dataCreate)}</p>
            </span>

            <span>
              <p>Status</p>
              <p style={{ fontSize: 13, color: "#11ec1c" }}>Resolvido</p>
            </span>
            <h2 style={{ fontSize: 13,margin:0 }}>Solução</h2>
            <p style={{ fontSize: 13, color: "#11ec1c" }}>{v.solucao}</p>
          </section>
        ))}
      </List>

    </Container>
  )
}

