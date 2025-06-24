import { useContext, useState, useEffect } from "react"
import { Container } from "./styles"
import { AuthContext } from "../../context/context";

export default function SelectVeiculo({ veiculo, setVeiculo, setPlaca }) {
  const { listVeiculo, } = useContext(AuthContext)
  const [listVeic, setListVeiculo] = useState([])

  useEffect(() => {
    async function run() {
      const res_veiculo = await listVeiculo();
      setListVeiculo(res_veiculo.data);
    }

    run();
  }, []);

  return (
    <Container>
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
    </Container>
  )
}

