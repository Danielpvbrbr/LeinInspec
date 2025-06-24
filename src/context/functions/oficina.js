import api from "../../services/api";

export const sendOficina = async (val) => {

    try {
        const response = await api.post('/oficina/register', val);
        const { message } = response.data
        alert(message);
        listOficina()
        return response.data;
    } catch (err) {
        alert(err?.response?.data?.error)
        return []
    }
};

export const deleteOficina = async (val) => {
    try {
        const response = await api.post('/oficina/delete', val);
        const { message } = response.data
        alert(message);
        listOficina()
        return response.data;
    } catch (err) {
        alert(err?.response?.data?.error)
        return []
    }
};

export const atualizarOficina = async (val) => {

    try {
        const response = await api.post('/oficina/atualizar', val);
        const { message } = response.data
        alert(message);
        listOficina()
        return response.data;
    } catch (err) {
        alert(err?.response?.data?.error)
        return []
    }
};

export const listOficina = async () => {

    try {
        const response = await api.get('/oficina/listar');
        //console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err?.response)
        return []
    }
};