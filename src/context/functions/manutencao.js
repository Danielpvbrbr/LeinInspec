import api from "../../services/api";

export const sendManutencao = async (val) => {
    try {
        const response = await api.post('/manutencao/register', val);
        const { message } = response.data
        alert(message);
        listManutencao()
        return response.data;
    } catch (err) {

        alert(err?.response?.data?.error)
        return []
    }
};

export const deleteManutencao = async (val) => {

    try {
        const response = await api.post('/manutencao/delete', val);
        const { message } = response.data
        alert(message);
        listManutencao()
        return response.data;
    } catch (err) {

        alert(err?.response?.data?.error)
        return []
    }
};

export const atualizarManutencao = async (val) => {

    try {
        const response = await api.post('/manutencao/atualizar', val);
        const { message } = response.data
        alert(message);
        listManutencao()
        return response.data;
    } catch (err) {
        alert(err?.response?.data?.error)
        return []
    }
};

export const listManutencao = async (val) => {

    try {
        const response = await api.get('/manutencao/listar');
        //console.log(response.data);
        return response.data;
    } catch (err) {

        console.log(err?.response)
        return []
    }
};
