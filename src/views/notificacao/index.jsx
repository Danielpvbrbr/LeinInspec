import { useContext, useEffect, useState } from 'react';
import { Container, List, LineNot, Confirm } from './styles';
import { AuthContext } from '../../context/context';
import { BsXCircleFill } from "react-icons/bs";

function formatDate(data) {
  const d = new Date(data);
  return d.toLocaleDateString("pt-BR");
}

export default function Notificacao() {
  const { getlistDefeito, atualizarDefeito, getNotificacao } = useContext(AuthContext);
  const [notificacao, setNotificacao] = useState([]);
  const [solucao, setSolucao] = useState("");
  const [isConfirm, seIsConfirm] = useState(false);

  useEffect(() => {
    const run = async () => {
      const res = await getNotificacao();
      setNotificacao(res);
    };

    run();
  }, []);

  async function submit(v) {
    seIsConfirm(v);

    if (isConfirm && solucao.length <= 10) {
      return alert("Favor preencher um número maior maior de caracteres!")
    }

    if (v.id && solucao.length >= 10) {
      const res = await atualizarDefeito({
        status: 1,
        id: v.id,
        solucao
      })

      if (res) {
        seIsConfirm(null);
        setSolucao(null)
        await getlistDefeito();
        setNotificacao(await getNotificacao());
      }
    }
  }

  const calDias = (data) => {
    const hoje = new Date();
    const dataInformada = new Date(data);

    // diferença em milissegundos
    const diffMs = hoje - dataInformada;

    // converter ms para dias
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    return ` ${diffDias} dias`;
  };

  return (
    <Container>
      <List>
        {notificacao?.res1?.map((v, i) =>
          <LineNot key={i} style={{ backgroundColor: "#e77111" }}>
            <p style={{ fontSize: 16, lineHeight: '1.5', wordBreak: 'break-word' }}>
              <strong>Checklist do veículo <strong style={{ color: "#4c00ff" }}>
                {v?.veiculo}</strong> </strong> da placa <strong style={{ color: "#4c00ff" }}>
                {v?.placa}</strong> está em atraso,<strong style={{ color: "#0044ff" }}>{calDias(v?.ultimaData)}</strong> ultima verificação foi em <strong style={{ color: "#4c00ff" }}>{formatDate(v?.ultimaData)}</strong>
              <br />
            </p>
          </LineNot>
        )}

        {notificacao?.res2?.map((v, i) => (
          !Boolean(v.status) &&
          <LineNot key={i}>
            <p style={{ fontSize: 16, lineHeight: '1.5', wordBreak: 'break-word' }}>
              <strong>{v.responsavel}</strong> informou que o veículo <strong>{v.veiculo}</strong> (placa <strong>{v.placa}</strong>) está com o seguinte defeito:
              <br />
              <span style={{ display: 'block', marginTop: 5 }}>{v.descricao}</span>
            </p>
            <p style={{ fontSize: 11, marginTop: 5 }}>{formatDate(v.dataCreate)}</p>
            <button
              style={{
                marginTop: 8,
                padding: '6px 12px',
                fontSize: 12,
                background: '#77F377',
                border: 'none',
                borderRadius: 4,
                color: '#302e2edd',
                cursor: 'pointer'
              }}
              onClick={() => submit(v)}
            >
              Marcar como resolvido
            </button>
          </LineNot>
        ))}
      </List>

      {isConfirm &&
        <Confirm>
          <BsXCircleFill
            size={22}
            color='#fff'
            cursor="pointer"
            onClick={() => seIsConfirm(null)}
          />

          <textarea
            value={solucao}
            onChange={e => setSolucao(e.target.value)}
            maxLength={645}
            placeholder="Descreva o que foi feito para solucionar."
          />
          <button onClick={() => submit(isConfirm)}>Finalizar</button>
        </Confirm>
      }
    </Container>
  );
}
