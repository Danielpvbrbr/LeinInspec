import { useContext, useEffect, useState } from 'react'
import { Container, AreaInfo, List } from "./styles"
import { BsXLg } from "react-icons/bs";
import { AuthContext } from '../../context/context';
import SelectVeiculo from '../../components/SelectVeiculo';
import InputUniversal from '../../components/InputUniversal';
import SelectOficina from '../../components/SelectOficina';
import { formatDate } from '../../components/functions/formatDate';
export default function Manutencao() {
  const {
    sendManutencao,
    listManutencao,
    deleteManutencao,
    atualizarManutencao
  } = useContext(AuthContext)
  const [name, setName] = useState({ id: "", name: "" })
  const [list, setList] = useState([])
  const [veiculo, setVeiculo] = useState("")
  const [oficina, setOficina] = useState("")
  const [placa, setPlaca] = useState("")
  const [garantiaDate, setGarantiaDate] = useState(null)

  const handleSubmit = async () => {

    if (name) {
      if (name.id) {
        const res = await atualizarManutencao({
          descricao: name.name,
          oficina: oficina,
          garantiaDate: garantiaDate,
          veiculo: veiculo,
          placa: placa,
          id: name.id
        })
        if (res) {
          await run()
        }
      } else {
        const res = await sendManutencao({
          descricao: name.name,
          oficina: oficina,
          garantiaDate: garantiaDate,
          veiculo: veiculo,
          placa: placa,
          dataCreate: formatDate()
        })

        if (res) {
          await run()
        }
      }
      limparCampo()

      return await run()
    }

    alert("Campo Serviço vazio! ")
  }

  useEffect(() => {
    run()
  }, [deleteManutencao])

  async function run() {
    const res = await listManutencao();
    setList(res.data);
  }

  async function removerItem({ name, id }) {
    if (window.confirm(`Deseja realmente excluir ${name}?`)) {
      const res = await deleteManutencao({ id: id })
      if (res) {
        await run()
        limparCampo()
      }
    }
  }

  function limparCampo() {
    setName({ id: "", name: "" })
    setVeiculo("")
    setOficina("")
    setPlaca("")
    setGarantiaDate("")
  }

  function getValues(v) {
    setName({ id: v.id, name: v.descricao })
    setVeiculo(v.veiculo)
    setOficina(v.oficina)
    setPlaca(v.placa)
    setGarantiaDate(v.garantiaDate ? v.garantiaDate.substring(0, 10) : '');
  }

  return (
    <Container>
      <fieldset>
        <legend>{name.id ? "Atualizar Registro" : "Adicionar Novo"}</legend>
        <AreaInfo>
          <SelectVeiculo
            veiculo={veiculo}
            setVeiculo={setVeiculo}
            setPlaca={setPlaca}
          />
          <section>
            <p>Vencimento</p>
            <input
              type="date"
              value={garantiaDate}
              onChange={e => setGarantiaDate(e.target.value)}
            />
          </section>

        </AreaInfo>

        <SelectOficina
          oficina={oficina}
          setOficina={setOficina}
          setPlaca={setPlaca}
        />
        <InputUniversal
          titulo="Nome da Serviço"
          type='text'
          value={name.name}
          placeholder='Digite o nome do Serviço...'
          onChange={e => setName({ id: name.id, name: e.target.value })}
          maxLength={200}
        />
        <span>
          <button
            type='button'
            onClick={handleSubmit}
            style={{ background: "#39913d" }}
          >{name.id ? "Atualizar" : "Salvar"}</button>
          {name.id &&
            <button
              type='button'
              onClick={() => removerItem({ name: name.name, id: name.id })}
              style={{ background: "#ca5858" }}
            >Excluir</button>
          }
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
        <legend>Lista de Manutencao</legend>
        {list.map((v, i) =>
          <section
            key={i}
            onClick={() => getValues(v)}
            style={{ background: v.id == name.id ? "#39913d" : "#46545E" }}
          >
            <h4>{v.descricao}</h4>
            <BsXLg color='#ffffff' onClick={() => removerItem({ name: v.descricao, id: v.id })} />
          </section>
        )}
      </List>
    </Container>
  )
}

