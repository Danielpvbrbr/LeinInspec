import api from "../../services/api";

export const sendOficina = async (val) => {

    try {
        const response = await api.post('/oficina/register', val);
        const { message } = response.data
        alert(message);
        listOficina()
        return response.data;
    } catch (err) {
        alert("Erro: Entre em contato com desenvolvedor")
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
        alert("Erro: Entre em contato com desenvolvedor")
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
        alert("Erro: Entre em contato com desenvolvedor")
        return []
    }
};

export const listOficina = async () => {

    try {
        const response = await api.get('/oficina/listar');
        //console.log(response.data);
        return response.data;
    } catch (err) {
        alert("Erro: Entre em contato com desenvolvedor")
        return []
    }
};