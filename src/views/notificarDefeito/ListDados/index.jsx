import { useContext, useEffect, useState } from 'react'
import { Container, Header, List, ButtonList } from "./styles"
import { getPeriodoInicioDoMes } from "../../inicio/func/periodo"

import { AuthContext } from '../../../context/context';
import LineServicos from '../../../components/LineServicos';
import PeriodoBuscar from '../../../components/PeriodoBuscar';

export default function ListDados({ setIsList, getValues }) {
  const { listDefeito, } = useContext(AuthContext)
  const [list, setList] = useState([])
  const [search, setSearch] = useState("");
  const [periodo, setPeriodo] = useState(getPeriodoInicioDoMes());

  useEffect(() => { run() }, [])

  async function run() {
    const res = await listDefeito();
    setList(res.data);
  }

  const filtrados = list.filter(v => {
    const inicio = new Date(`${periodo.start}T00:00:00`);
    const fim = new Date(`${periodo.end}T23:59:59`);
    const dataItem = new Date(v.dataCreate);

    return (
      dataItem >= inicio &&
      dataItem <= fim &&
      v.descricao?.toLowerCase().includes(search.toLowerCase())
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

