import api from "../../services/api";

export const sendMotorista = async (val) => {
    try {
        const response = await api.post('/motorista/register', val);
        const { message } = response.data
        alert(message);
        listMotorista()
        return response.data;
    } catch (err) {
        alert("Erro: Entre em contato com desenvolvedor")
        return []
    }
};

export const deleteMotorista = async (val) => {
    try {
        const response = await api.post('/motorista/delete', val);
        const { message } = response.data
        alert(message);
        listMotorista()
        return response.data;
    } catch (err) {
        alert("Erro: Entre em contato com desenvolvedor")
        return []
    }
};

export const atualizarMotorista = async (val) => {

    try {
        const response = await api.post('/motorista/atualizar', val);
        const { message } = response.data
        alert(message);
        listMotorista()
        return response.data;
    } catch (err) {
        alert("Erro: Entre em contato com desenvolvedor")
        return []
    }
};

export const listMotorista = async () => {
    try {
        const response = await api.get('/motorista/listar');
        //console.log(response.data);
        return response.data;
    } catch (err) {
        alert("Erro: Entre em contato com desenvolvedor")
        return []
    }
};