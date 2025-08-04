import api from "../../services/api";

export const sendDefeito = async (val) => {
    try {
        const response = await api.post('/defeito/register', val);
        const { message } = response.data
        alert(message);
        listManutencao()
        return response.data;
    } catch (err) {

        alert(err?.response?.data?.error)
        return []
    }
};

export const deleteDefeito = async (val) => {

    try {
        const response = await api.post('/defeito/delete', val);
        const { message } = response.data
        alert(message);
        listManutencao()
        return response.data;
    } catch (err) {

        alert(err?.response?.data?.error)
        return []
    }
};

export const atualizarDefeito = async (val) => {

    try {
        const response = await api.post('/defeito/atualizar', val);
        const { message } = response.data
        alert(message);
        listManutencao()
        return response.data;
    } catch (err) {
        alert(err?.response?.data?.error)
        return []
    }
};

export const listDefeito = async (val) => {

    try {
        const response = await api.get('/defeito/listar');
        //console.log(response.data);
        return response.data;
    } catch (err) {

        console.log(err?.response)
        return []
    }
};
