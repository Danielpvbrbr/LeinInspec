import { useContext, useEffect, useState } from 'react'
import { Container, AreaInfo, ListServico, Line, AreaServic, ButtonList } from "./styles"
import { BsXLg, BsArrowRepeat, BsPlusSquareFill, BsEraserFill } from "react-icons/bs";
import { AuthContext } from '../../context/context';
import SelectVeiculo from '../../components/SelectVeiculo';
import InputUniversal from '../../components/InputUniversal';
import SelectOficina from '../../components/SelectOficina';
import { formatDate } from '../../components/functions/formatDate';
import ListDados from './ListDados';


export default function Manutencao() {
  const {
    sendManutencao,
    listManutencao,
    deleteManutencao,
    atualizarManutencao
  } = useContext(AuthContext)
  const [name, setName] = useState("")
  const [id, setId] = useState("")
  const [veiculo, setVeiculo] = useState("")
  const [oficina, setOficina] = useState("")
  const [placa, setPlaca] = useState("")
  const [garantiaDate, setGarantiaDate] = useState(null)
  const [dateitem, setDateitem] = useState(null)
  const [isList, setIsList] = useState(false)
  const [listServico, setListServico] = useState([])
  const [idItemServ, setIdItemServ] = useState("")

  const handleSubmit = async () => {

    const servicesArray = JSON.stringify(listServico)

    if (veiculo && oficina) {
      if (id) {
        await atualizarManutencao({
          descricao: (name?.length > 0) ? name : listServico[0].name,
          oficina: oficina,
          garantiaDate: garantiaDate && /\d/.test(garantiaDate) ? garantiaDate : null,
          veiculo: veiculo,
          placa: placa,
          servicesArray: servicesArray,
          id: id
        })
      } else {
        await sendManutencao({
          descricao: (name?.length > 0) ? name : listServico[0].name,
          oficina: oficina,
          garantiaDate: garantiaDate && /\d/.test(garantiaDate) ? garantiaDate : null,
          veiculo: veiculo,
          placa: placa,
          dataCreate: formatDate(),
          servicesArray: servicesArray
        })
      }
      limparCampo()
    } else {
      alert("Favor Preencher os campos que tem o *")
    }

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
    setId("")
    setName("")
    setVeiculo("")
    setOficina("")
    setPlaca("")
    setGarantiaDate("")
    setListServico([])
  }

  function getValues(v) {
    setIsList(false)
    setName(v.descricao)
    setId(v.id)
    setVeiculo(v.veiculo)
    setOficina(v.oficina)
    setPlaca(v.placa)
    setGarantiaDate(v.garantiaDate ? v.garantiaDate.substring(0, 10) : '');
    setListServico(JSON.parse(v?.servicesArray))
  }

  function handleSend() {
    const novoItem = { name: name, date: dateitem };

    if (/\d/.test(idItemServ)) {
      // Remover E add novo
      const novaLista = listServico
        .filter((_, i) => i !== idItemServ)
        .concat(novoItem);

      setListServico(novaLista);
    } else {
      setListServico([...listServico, novoItem]);
    }

    setName("");
    setDateitem("");
    setIdItemServ("");
  }

  function handleRemove(idx) {
    if (window.confirm(`Deseja realmente excluir esse item?`)) {
      setName("")
      setDateitem("")
      setListServico(listServico.filter((_, i) => i !== idx));
    }
  }

  function change(v, i) {
    setName(v.name);
    setDateitem(v.date);
    setIdItemServ(i);
  }

  return (
    <Container  >
      <fieldset style={{ visibility: isList ? "hidden" : "visible", display: isList && "none" }}>
        <legend>{id ? "Atualizar Registro" : "Adicionar Novo"}</legend>
        <AreaInfo>
          <SelectVeiculo
            veiculo={veiculo}
            setVeiculo={setVeiculo}
            setPlaca={setPlaca}
          />
          <section>
            <p>Garantia</p>
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

        <AreaServic >
          <InputUniversal
            titulo="Nome do Serviço *"
            type='text'
            value={name}
            placeholder='Digite o nome do Serviço...'
            onChange={e => {
              setName(e.target.value)
            }}
            maxLength={100}
          />
          <section>
            <p>Vencimento</p>
            <input
              value={dateitem}
              type='date'
              onChange={e => setDateitem(e.target.value)}
            />
          </section>

          <BsEraserFill
            color='#5886ca'
            size={40}
            cursor="pointer"
            onClick={() => {
              setName("");
              setDateitem("");
              setIdItemServ("")
            }}
          />
          {
            /\d/.test(idItemServ) ?
              <BsArrowRepeat
                color='#39913d'
                size={40}
                cursor="pointer"
                onClick={handleSend}
              />
              :
              <BsPlusSquareFill
                color='#39913d'
                size={40}
                cursor="pointer"
                onClick={handleSend}
              />
          }
        </AreaServic>

        <p style={{ textAlign: "center" }}>Serviços</p>
        <ListServico>
          {listServico.map((v, i) =>
            <Line key={i} >
              <p onClick={() => change(v, i)}>{v.name}</p>
              <span>
                <input
                  type='date'
                  value={v.date}
                  style={{ color: "rgb(33, 153, 53)" }}
                  onClick={() => change(v, i)}
                  disabled
                />

                <BsXLg
                  color='#ff1504'
                  onClick={() => handleRemove(i)}
                />
              </span>
            </Line>
          )}
        </ListServico>
        <span>
          <button
            type='button'
            onClick={handleSubmit}
            style={{ background: "#39913d" }}
          >{id ? "Atualizar" : "Salvar"}</button>
          {id &&
            <button
              type='button'
              onClick={() => removerItem({ name: name, id: id })}
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
      {isList &&
        <ListDados
          isList={isList}
          setIsList={setIsList}
          getValues={getValues}
        />
      }

      {!isList &&
        <ButtonList onClick={() => setIsList(!isList)}> Listar Dados</ButtonList>
      }
    </Container >
  )
}

