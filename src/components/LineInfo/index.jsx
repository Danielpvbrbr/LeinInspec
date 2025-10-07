import { useState } from 'react'
import { Container, Area, Line } from "./styles"
import { BsSearch } from "react-icons/bs";

export default function LineInfo({ data, key }) {
  const [isMenu, setIsMunu] = useState(false)
  const list = JSON.parse(data.listCheckout)

  function formatarDataBr(dataIso) {
    if (dataIso) {
      let [date, hora] = dataIso.split(" ")
      let [ano, mes, dia] = date.split("-")
      return `${dia}/${mes}/${ano} ${hora} `
    }

    return ''
  }

  return (
    <Container key={key} onClick={() => setIsMunu(!isMenu)} >
      <span style={{ minHeight: "28px" }}>
        <div>{data?.veiculo}</div>
        <div>{formatarDataBr(data?.dataHora)}</div>
      </span>

      {isMenu &&
        <Area>
          <Line>
            <p>Verificado por:</p>
            <p style={{ color: "#77F377" }}>{data?.usuario}</p>
          </Line>
          <Line>
            <p>Motorista:</p>
            <p style={{ color: "#77F377" }}>{data?.condutor}</p>
          </Line>
          <Line>
            <p>Veiculo:</p>
            <p style={{ color: "#77F377" }}>{data?.veiculo}</p>
          </Line>
          <Line>
            <p>Placa:</p>
            <p style={{ color: "#77F377" }}>{data?.placa}</p>
          </Line>
          <Line>
            <p>KM:</p>
            <p style={{ color: "#77F377" }}>{data?.km}</p>
          </Line>
          <Line>
            <p >Observações:</p>
            <p style={{
              color: "#77F377",
              wordBreak: "break-word",
              whiteSpace: "normal"
            }}>{data?.observacao}</p>
          </Line>
          <p style={{
            color: "#46545E",
            fontSize: 14,
            marginBottom: 5,
            marginTop: 5
          }}>Lista de itens verificados</p>
          {list.map((v, i) =>
            <Line key={i} style={{ background: "#D9D9D9", marginBottom: 5 }}>
              <p style={{ color: "#46545E" }}>{v?.name}</p>
              <p style={{ color: v?.check ? "#55ac3b" : "#ff1e00" }}>{v?.check ? "OK" : "Ruim"}</p>
            </Line>
          )}
        </Area>
      }
    </Container>
  )
}

