import api from "../../services/api";

const tratarErro = (err) => {
    if (err.response && err.response.data && err.response.data.error) {
        alert("Erro: " + err.response.data.error);
    } else {
        alert("Erro: Entre em contato com o desenvolvedor");
        console.error("Erro desconhecido:", err);
    }
};

export const sendAbastecimento = async (val) => {
    try {
        const response = await api.post('/abastecimento/register', val);
        alert(response.data.message);

        return response.data;
    } catch (err) {
        tratarErro(err);
        return [];
    }
};


export const listAbasteciemnto = async () => {
    try {
        const response = await api.get('/abastecimento/listar');
        return response.data;
    } catch (err) {
        tratarErro(err);
        return [];
    }
};
