import { useContext, useEffect, useState } from 'react'
import { Container, Header, List, ButtonList } from "./styles"
import { getPeriodoInicioDoMes } from "../../func/periodo"
import { AuthContext } from '../../../context/context';
import LineServicos from '../../../components/LineServicos/index_';
import PeriodoBuscar from '../../../components/PeriodoBuscar';

export default function ListDados({ isList, setIsList, getValues }) {
  const { listManutencao, } = useContext(AuthContext)
  const [list, setList] = useState([])
  const [search, setSearch] = useState("");
  const [periodo, setPeriodo] = useState(getPeriodoInicioDoMes());

  useEffect(() => { run() }, [])

  async function run() {
    const res = await listManutencao();
    setList(res.data);
  }

  const filtrados = list.filter(v => {
    const inicio = new Date(`${periodo.start}T00:00:00`);
    const fim = new Date(`${periodo.end}T23:59:59`);
    const dataItem = new Date(v.dataCreate);

    // Normaliza busca
    const termo = search.toLowerCase();

    return (
      dataItem >= inicio &&
      dataItem <= fim &&
      (
        v.descricao?.toLowerCase().includes(termo) ||
        v.veiculo?.toLowerCase().includes(termo) ||
        v.oficina?.toLowerCase().includes(termo)
      )
    );
  });

  return (
    <Container>
      <Header>
        <PeriodoBuscar
          search={search}
          setSearch={e => setSearch(e.target.value)}
          gerarPDF={() => { }}
          listCheck={filtrados}
          periodo={periodo}
          setPeriodo={setPeriodo}
        />
      </Header>
      <List>
        {filtrados.map((v, i) =>
          <LineServicos
            key={i}
            data={v}
            onClick={() => getValues(v)}
            run={run}
          />
        )}
      </List>
      <ButtonList onClick={() => setIsList(false)}>Voltar</ButtonList>
    </Container>
  )
}

