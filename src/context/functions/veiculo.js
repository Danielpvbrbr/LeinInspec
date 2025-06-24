import api from "../../services/api";

export const sendVeiculo = async (val) => {
    try {
        const response = await api.post('/veiculo/register', val);
        const { message } = response.data
        alert(message);
        listVeiculo()
        return response.data;
    } catch (err) {
        alert(err?.response?.data?.error)
        return []
    }
};

export const deleteVeiculo = async (val) => {

    try {
        const response = await api.post('/veiculo/delete', val);
        const { message } = response.data
        alert(message);
        listVeiculo()
        return response.data;
    } catch (err) {
        alert(err?.response?.data?.error)
        return []
    }
};

export const atualizarVeiculo = async (val) => {
    try {
        const response = await api.post('/veiculo/atualizar', val);
        const { message } = response.data
        alert(message);
        listVeiculo()
        return response.data;
    } catch (err) {
        alert(err?.response?.data?.error)
        return []
    }
};

export const listVeiculo = async () => {
    try {
        const response = await api.get('/veiculo/listar');
        //console.log(response.data);
        return response.data;
    } catch (err) {
        alert(err?.response?.data?.error)
        return []
    }
};