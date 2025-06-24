import { useContext, useState, useEffect } from "react"
import { Container } from "./styles"
import { AuthContext } from "../../context/context";

export default function SelectMotorista({ condutor, setCondutor }) {
  const { listMotorista } = useContext(AuthContext)
  const [listMotor, setListMotorista] = useState([])

  useEffect(() => {
    async function run() {
      const res_listMotorista = await listMotorista();
      setListMotorista(res_listMotorista.data);
    }

    run();
  }, []);

  return (
    <Container>
      <p>Motorista *</p>
      <select value={condutor} onChange={e => setCondutor(e.target.value)}>
        <option value="" selected={true}>Selecione o Motorista</option>
        {listMotor.map((v, i) =>
          <option key={i} value={v.descricao}>{v.descricao}</option>
        )}
      </select>
    </Container>
  )
}

