export function getPeriodoInicioDoMes() {
  function formatDateBr(date) {
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();
    return `${ano}-${mes}-${dia}`; // formato YYYY-MM-DD
  }

  const hoje = new Date();
  const inicioDoMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1); // dia 1 do mês atual

  return {
    start: formatDateBr(inicioDoMes),
    end: formatDateBr(hoje),
  };
}
