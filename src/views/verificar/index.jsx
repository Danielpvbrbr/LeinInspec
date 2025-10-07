import { useContext, useEffect, useState, useRef } from 'react'
import { Container, List } from "./styles"
import Search from '../../components/Search';
import ButtonSend from '../../components/ButtonSend';
import LineInfo from '../../components/LineInfo';
import { AuthContext } from '../../context/context';
import { gerarPDF } from "../func/gerarPDF"
import { getPeriodoInicioDoMes } from "../func/periodo"

export default function Verificar({ setIsForm }) {
  const { listCheckout, listCheck, setListCheck } = useContext(AuthContext);
  const [] = useState([]);
  const [search, setSearch] = useState("");
  const [periodo, setPeriodo] = useState(getPeriodoInicioDoMes());

  useEffect(() => {
    const run = async () => {
      const res = await listCheckout();
      setListCheck(res.data);
    };
    run();
  }, []);

  const filtrados = listCheck.filter(v => {
    const inicio = new Date(`${periodo.start}T00:00:00`);
    const fim = new Date(`${periodo.end}T23:59:59`);
    const dataItem = new Date(v.dataHora); //  estar em formato ISO

    return (
      dataItem >= inicio &&
      dataItem <= fim &&
      v.veiculo?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <Container>
      <Search
        search={search}
        setSearch={e => setSearch(e.target.value)}
        gerarPDF={gerarPDF}
        listCheck={filtrados}
        periodo={periodo}
        setPeriodo={setPeriodo}
      />
      <List>
        {filtrados.map((v, i) =>
          <LineInfo
            key={i}
            data={v}
          />
        )}
      </List>
      <ButtonSend onClick={() => setIsForm(true)} />
    </Container>
  );
}
