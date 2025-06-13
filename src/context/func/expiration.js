export default function expirado(dataStr) {
  // dataStr no formato "DD/MM/YYYY, HH:mm:ss"
  const [data, hora] = dataStr.split(', ');
  const [dia, mes, ano] = data.split('/');
  const [h, m, s] = hora.split(':');
  const dataObj = new Date(ano, mes - 1, dia, h, m, s);
  return new Date() > dataObj;
}