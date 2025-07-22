const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5157; //ser for modo cliente mudar para 9000
const { auth, register, usuarios_listar, usuarios_delete, usuarios_atualizar } = require('./routes/auth');
const { listar, motor_register, motor_delete, motor_atualizar } = require('./routes/motorista');
const { veiculo_listar, veiculo_register, veiculo_delete, veiculo_atualizar } = require('./routes/veiculos');
const { grupo_listar, grupo_register, grupo_delete, grupo_atualizar } = require('./routes/grupos');
const { checkout_listar, checkout_register } = require('./routes/checkout');
const { oficina_listar, oficina_register, oficina_delete, oficina_atualizar } = require('./routes/oficina');
const { manute_listar, manute_register, manute_delete, manute_atualizar } = require('./routes/manutencao');

app.use(cors())
app.use(express.json());

const distPath = path.join(__dirname, 'dist'); //Modo Deploy
app.use(express.static(distPath)); //Modo Deploy

app.post('/auth', auth);
app.get("/usuarios/listar", usuarios_listar)
app.post("/usuarios/register", register)
app.post("/usuarios/delete", usuarios_delete)
app.post("/usuarios/atualizar", usuarios_atualizar)

app.get("/motorista/listar", listar)
app.post("/motorista/register", motor_register)
app.post("/motorista/delete", motor_delete)
app.post("/motorista/atualizar", motor_atualizar)

app.get("/veiculo/listar", veiculo_listar)
app.post("/veiculo/register", veiculo_register)
app.post("/veiculo/delete", veiculo_delete)
app.post("/veiculo/atualizar", veiculo_atualizar)

app.get("/grupo/listar", grupo_listar)
app.post("/grupo/register", grupo_register)
app.post("/grupo/delete", grupo_delete)
app.post("/grupo/atualizar", grupo_atualizar)

app.get("/checkout/listar", checkout_listar)
app.post("/checkout/register", checkout_register)
//app.post("/checkout/delete", checkout_delete)

app.get("/oficina/listar", oficina_listar)
app.post("/oficina/register", oficina_register)
app.post("/oficina/delete", oficina_delete)
app.post("/oficina/atualizar", oficina_atualizar)

app.get("/manutencao/listar", manute_listar)
app.post("/manutencao/register", manute_register)
app.post("/manutencao/delete", manute_delete)
app.post("/manutencao/atualizar", manute_atualizar)


app.get('*', (req, res) => { //Modo deploy
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
