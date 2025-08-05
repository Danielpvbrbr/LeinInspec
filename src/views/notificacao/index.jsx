import { useContext, useEffect, useState } from 'react';
import { Container, List, LineNot } from './styles';
import { AuthContext } from '../../context/context';

function formatDate(data) {
  const d = new Date(data);
  return d.toLocaleDateString("pt-BR");
}


export default function Notificacao() {
  const { getlistDefeito, atualizarDefeito, notificacao } = useContext(AuthContext);

  useEffect(() => {
    getlistDefeito()
  }, []);


  async function submit(v) {

    if (v.id) {
      const res = await atualizarDefeito({
        status: 1,
        id: v.id
      })

      if (res) {
        getlistDefeito()
      }
    }

  }

  return (
    <Container>
      <List>
        {notificacao.map((v, i) => (
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
    </Container>
  );
}
