function gerarExpiracao() {
  const agora = new Date();
  const expiracao = new Date(agora.getTime() + 60 * 60 * 1000).toLocaleString(); // +1 hora
  return { agora, expiracao };
}

const { expiracao } = gerarExpiracao();

module.exports = { expiracao };


