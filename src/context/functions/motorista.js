import api from "../../services/api";

export const sendMotorista = async (val) => {
    try {
        const response = await api.post('/motorista/register', val);
        const { message } = response.data
        alert(message);
        listMotorista()
        return response.data;
    } catch (err) {
        alert(err?.response?.data?.error)
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
        alert(err?.response?.data?.error)
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
        alert(err?.response?.data?.error)
        return []
    }
};

export const listMotorista = async () => {
    try {
        const response = await api.get('/motorista/listar');
        //console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err?.response)
        return []
    }
};