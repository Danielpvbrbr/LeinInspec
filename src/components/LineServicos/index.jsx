import { useContext, useState, useEffect } from "react"
import { Container } from "./styles"
import { AuthContext } from "../../context/context";
// import { formatDate } from '../../../components/functions/formatDate';
import { formatarDataBr } from "../functions/formatarDataBr"
import { BsXLg, BsPencil } from "react-icons/bs";

export default function LineServicos({ key, data, onClick, run }) {
  const { deleteManutencao } = useContext(AuthContext)
  const servicesArray = JSON.parse(data?.servicesArray)

  const [isLine, setIsLine] = useState(false)

  async function removerItem({ name, id }) {
    if (window.confirm(`Deseja realmente excluir ${name}?`)) {
      const res = await deleteManutencao({ id: id })
      if (res) {
        await run()
      }
    }
  }

  return (
    <Container
      style={{ background: data.id == name.id ? "#39913d" : "#46545E" }}
      onClick={() => setIsLine(!isLine)}
      key={key}
    // onClick={() => setIsLine(!isLine)}
    >
      <section key={key} >
        <div>
          <h4><strong>Oficina:</strong> {data.oficina}</h4>
          <h4><strong>Data:</strong> {formatarDataBr(data.dataCreate).split(" ")[0]}</h4>
          <h4><strong>Vencimento Garantia:</strong> {formatarDataBr(data.garantiaDate).split(" ")[0]}</h4>
          <h4><strong>Descrição: </strong>{data.descricao}</h4>
        </div>
        <h5>
          <BsPencil
            color='#ffffff'
            size={20}
            onClick={onClick}
          />
          <BsXLg
            color='#ff0000'
            size={24}
            onClick={() => removerItem({ name: data.descricao, id: data.id })}
          />
        </h5>
      </section>

      {isLine &&
        <div>
          {servicesArray ? servicesArray.map((v, i) =>
            <span>
              <h4>{v?.name}</h4>
              <h4>Venc: {v.date ? formatarDataBr(v?.date).split(" ")[0] : "Não"}</h4>
            </span>
          )
            :
            <span>
              <h4>{data.descricao}</h4>
              <h4>Garantia: {formatarDataBr(data.garantiaDate).split(" ")[0]}</h4>
            </span>
          }
        </div>
      }
    </Container>
  )
}

