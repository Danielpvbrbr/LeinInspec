import { useState, useEffect, useContext } from 'react'
import { Container, Area, Header, InfoOption, List, Line, LineText, Action } from "./styles"
import { AuthContext } from '../../context/context'

export default function Checkout({ isForm, setIsForm }) {
  const {
    user,
    listGrupo,
    listMotorista,
    listVeiculo,
    sendCheckout
  } = useContext(AuthContext)
  const [listGroup, setListGroup] = useState([])
  const [listVeic, setListVeiculo] = useState([])
  const [listMotor, setListMotorista] = useState([])
  const [condutor, setCondutor] = useState("")
  const [veiculo, setVeiculo] = useState("")
  const [placa, setPlaca] = useState("")
  const [observacao, setObservacao] = useState("")
  const [listCheckout, setListCheckout] = useState([])

  const handleSubmit = () => {
    if (veiculo && veiculo) {
      const res = sendCheckout({
        condutor: condutor,
        veiculo: veiculo,
        placa: placa,
        usuario: user.user,
        observacao: observacao,
        listCheckout: JSON.stringify(listCheckout),
        dataHora: formatDateToMySQL(new Date())
      })

      if (res) {
        limpar()
      }

    } else {
      alert("Campo Veiculo e o Motorista e obrigatório")
    }

  }

  function limpar(date) {
    setCondutor("")
    setVeiculo("")
    setObservacao("")
  }

  function formatDateToMySQL(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }

  useEffect(() => {
    async function run() {
      const res_grupo = await listGrupo();
      const res_veiculo = await listVeiculo();
      const res_listMotorista = await listMotorista();

      setListGroup(res_grupo.data);
      setListVeiculo(res_veiculo.data);
      setListMotorista(res_listMotorista.data);
      setListCheckout(res_grupo.data.map(item => ({
        name: item.descricao,
        check: false
      })));
    }

    run();
  }, []);


  return (
    <Container isForm={isForm ? "flex" : "none"}>
      <Area>
        <Header>
          <h4>Check List Diário do Veículo</h4>
        </Header>
        <InfoOption>
          <p>Motorista *</p>
          <select value={condutor} onChange={e => setCondutor(e.target.value)}>
            <option value="" selected={true}>Selecione o Motorista</option>
            {listMotor.map((v, i) =>
              <option key={i} value={v.descricao}>{v.descricao}</option>
            )}
          </select>
          <p>Veiculo *</p>
          <select
            value={veiculo}
            onChange={e => {
              const selected = e.target.value;
              setVeiculo(selected);

              const veiculoSelecionado = listVeic.find(v => v.descricao === selected);
              if (veiculoSelecionado) {
                setPlaca(veiculoSelecionado.placa);
              }
            }}
          >
            <option value="" selected={true} >Selecione o Veiculo</option>
            {listVeic.map((v, i) =>
              <option key={i} value={v.descricao}>{v.descricao}</option>
            )}
          </select>
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

