import { useContext, useEffect, useState, useRef } from 'react'
import { Container, List } from "./styles"
import Search from '../../components/Search';
import ButtonSend from '../../components/ButtonSend';
import { AuthContext } from '../../context/context';
import { gerarPDF } from "../func/gerarPDF"
import { getPeriodoInicioDoMes } from "../func/periodo"

export default function VerificarAbastecimento({ isForm2, setIsForm2 }) {
  const { listAbastecimento, listCheck, setListCheck } = useContext(AuthContext);
  const [] = useState([]);
  const [search, setSearch] = useState("");
  const [periodo, setPeriodo] = useState(getPeriodoInicioDoMes());

  useEffect(() => {
    const run = async () => {
      const res = await listAbastecimento();
      setListCheck(res.data);
    };
    run();
  }, [isForm2]);

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
        {filtrados.map((v, i) => (
          <div
            key={i}
            style={{
              width: "93%",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "6px",
              backgroundColor: "#f9f9f9",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",

            }}
          >
            <div style={{ flex: 1 }}>
              <p><strong>Veículo:</strong> {v.veiculo}</p>
              <p><strong>Placa:</strong> {v.placa}</p>
              <p><strong>KM Atual:</strong> {v.kmAtual}</p>
              <p><strong>Usuário:</strong> {v.usuario}</p>
              <p><strong>Litros:</strong> {v.litros}</p>
              <p><strong>Preço/Litro:</strong> R$ {v.precoLitro}</p>
              <p><strong>Total:</strong> R$ {v.precoFinal}</p>
            </div>

            <div style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "8px"
            }}>
              {v.fotoBomba && (
                <img
                  src={v.fotoBomba}
                  alt="Foto da bomba"
                  style={{
                    width: "160px",
                    height: "160px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #ccc"
                  }}
                />
              )}
              {v.fotoHodometro && (
                <img
                  src={v.fotoHodometro}
                  alt="Foto do hodômetro"
                  style={{
                    width: "160px",
                    height: "160px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #ccc"
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </List>
      <ButtonSend onClick={() => setIsForm2(true)} />
    </Container>
  );
}
