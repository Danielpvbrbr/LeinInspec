import { useContext, useState, useEffect } from "react"
import { Container } from "./styles"
import { AuthContext } from "../../context/context";

export default function SelectOficina({ oficina, setOficina }) {
  const { listOficina } = useContext(AuthContext)
  const [listOfici, setListOfici] = useState([])

  useEffect(() => {
    async function run() {
      const res_listMotorista = await listOficina();
      setListOfici(res_listMotorista.data);
    }

    run();
  }, []);

  return (
    <Container>
      <p>Oficina *</p>
      <select value={oficina} onChange={e => setOficina(e.target.value)}>
        <option value="" selected={true}>Selecione a Oficina</option>
        {listOfici.map((v, i) =>
          <option key={i} value={v.descricao}>{v.descricao}</option>
        )}
      </select>
    </Container>
  )
}

