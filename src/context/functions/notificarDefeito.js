import api from "../../services/api";

const tratarErro = (err) => {
    if (err.response && err.response.data && err.response.data.error) {
        alert("Erro: " + err.response.data.error);
    } else {
        alert("Erro: Entre em contato com o desenvolvedor");
        console.error("Erro desconhecido:", err);
    }
};

export const sendDefeito = async (val, listManutencao) => {
    try {
        const response = await api.post('/defeito/register', val);
        alert(response.data.message);

        if (typeof listManutencao === 'function') {
            listManutencao();
        }

        return response.data;
    } catch (err) {
        tratarErro(err);
        return [];
    }
};


export const deleteDefeito = async (val) => {
    try {
        const response = await api.post('/defeito/delete', val);
        alert(response.data.message);
        try {
            listManutencao();
        } catch (erroInterno) {
            console.error("Erro ao executar listManutencao():", erroInterno);
        }
        return response.data;
    } catch (err) {
        tratarErro(err);
        return [];
    }
};


export const atualizarDefeito = async (val) => {
    try {
        const response = await api.post('/defeito/atualizar', val);
        alert(response.data.message);
        try {
            listManutencao();
        } catch (erroInterno) {
            console.error("Erro ao executar listManutencao():", erroInterno);
        }
        return response.data;
    } catch (err) {
        tratarErro(err);
        return [];
    }
};


export const listDefeito = async () => {
    try {
        const response = await api.get('/defeito/listar');
        return response.data;
    } catch (err) {
        tratarErro(err);
        return [];
    }
};
