import api from "../../services/api";

export const sendGrupo = async (val) => {
    try {
        const response = await api.post('/grupo/register', val);
        const { message } = response.data
        alert(message);
        listGrupo()
        return response.data;
    } catch (err) {
        alert(err?.response?.data?.error)
        return []
    }
};

export const deleteGrupo = async (val) => {
    try {
        const response = await api.post('/grupo/delete', val);
        const { message } = response.data
        alert(message);
        listGrupo()
        return response.data;
    } catch (err) {
        alert(err?.response?.data?.error)
        return []
    }
};

export const atualizarGrupo = async (val) => {

    try {
        const response = await api.post('/grupo/atualizar', val);
        const { message } = response.data
        alert(message);
        listGrupo()
        return response.data;
    } catch (err) {
        alert(err?.response?.data?.error)
        return []
    }
};

export const listGrupo = async () => {

    try {
        const response = await api.get('/grupo/listar');
        //console.log(response.data);
        return response.data;
    } catch (err) {

        alert(err?.response?.data?.error)
        return []
    }
};