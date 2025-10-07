import api from "../../services/api";

export const sendUsuarios = async (val) => {
    try {
        const response = await api.post('/usuarios/register', val);
        const { message } = response.data
        alert(message);
        listUsuarios()
        return response.data
    } catch (err) {
        alert("Erro: Entre em contato com desenvolvedor")
        return []
    }
};

export const listUsuarios = async () => {
    try {
        const response = await api.get('/usuarios/listar');
        //console.log(response.data);
        return response.data;
    } catch (err) {
        alert("Erro: Entre em contato com desenvolvedor")
        return []
    }
};

export const atualizarUsuarios = async (val) => {
    try {
        const response = await api.post('/usuarios/atualizar', val);
        const { message } = response.data
        alert(message);
        listUsuarios()
        return response.data
    } catch (err) {
        alert("Erro: Entre em contato com desenvolvedor")
        return []
    }
};

export const deleteUsuarios = async (val) => {

    try {
        const response = await api.post('/usuarios/delete', val);
        const { message } = response.data
        alert(message);
        listUsuarios()
        return response.data
    } catch (err) {
        alert("Erro: Entre em contato com desenvolvedor")
        return []
    }
};