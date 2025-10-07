import { useState, useEffect, useContext } from 'react'
import { Container, Area, Header, InfoOption, List, Line, LineText, Action, InputKM } from "./styles"
import { AuthContext } from '../../context/context'
import SelectVeiculo from '../SelectVeiculo'
import SelectMotorista from '../SelectMotorista'
import { formatDate } from '../functions/formatDate'

export default function Checkout({ isForm, setIsForm }) {
  const {
    user,
    listGrupo,
    sendCheckout
  } = useContext(AuthContext)
  const [listGroup, setListGroup] = useState([])
  const [condutor, setCondutor] = useState("")
  const [veiculo, setVeiculo] = useState("")
  const [placa, setPlaca] = useState("")
  const [km, setKm] = useState("")
  const [observacao, setObservacao] = useState("")
  const [listCheckout, setListCheckout] = useState([])

  const handleSubmit = () => {

    if (veiculo && veiculo && km) {
      const res = sendCheckout({
        condutor: condutor,
        veiculo: veiculo,
        placa: placa,
        usuario: user.user,
        observacao: observacao,
        listCheckout: JSON.stringify(listCheckout),
        dataHora: formatDate(),
        km: km
      })

      if (res) {
        limpar()
      }

    } else {
      alert("Campo Motorista e Veiculo e KM e obrigatório")
    }

  }

  function limpar() {
    setCondutor("")
    setVeiculo("")
    setObservacao("")
    setKm(0)
  }

  useEffect(() => {
    async function run() {
      const res_grupo = await listGrupo();
      setListGroup(res_grupo.data);
      setListCheckout(res_grupo.data.map(item => ({
        name: item.descricao,
        check: false
      })));
    }

    run();
  }, [isForm]);


  return (
    <Container isForm={isForm ? "flex" : "none"}>
      <Area>
        <Header>
          <h4>Check List Diário do Veículo</h4>
        </Header>
        <InfoOption>
          <SelectMotorista
            condutor={condutor}
            setCondutor={setCondutor}
          />
          <SelectVeiculo
            veiculo={veiculo}
            setVeiculo={setVeiculo}
            setPlaca={setPlaca}
          />
          <p>KM Atual</p>
          <InputKM
            type='number'
            value={km}
            maxLength={10}
            placeholder='Informe KM'
            pattern="[0-9]*"
            onChange={e => setKm(e.target.value)}
          />
        </InfoOption>
        <List>
          {listGroup.map((v, i) => {
            return (
              <Line key={i}>
                <h4>{v.descricao}</h4>
                <input
                  type="checkbox"
                  checked={
                    listCheckout.find(item => item.name === v.descricao)?.check || false
                  }
                  onChange={e => {
                    const isChecked = e.target.checked;

                    const updatedList = [...listCheckout];
                    const index = updatedList.findIndex(item => item.name === v.descricao);

                    if (index !== -1) {
                      updatedList[index].check = isChecked; // atualiza o existente
                    } else {
                      updatedList.push({ name: v.descricao, check: isChecked }); // adiciona novo
                    }

                    setListCheckout(updatedList);
                  }}
                />
              </Line>
            )
          })}

          <LineText>
            <h4>Check List Diário do Veículo</h4>
            <textarea
              type='checkbox'
              placeholder='Digite sua observação'
              maxLength={200}
              value={observacao}
              onChange={e => setObservacao(e.target.value)}
            />
          </LineText>
        </List>
        <Action>
          <button style={{ background: "#479470" }} onClick={handleSubmit}>Finalizar</button>
          <button style={{ background: "#496B83" }} onClick={() => setIsForm(false)}>Fechar</button>
        </Action>
      </Area>
    </Container>
  )
}

