import api from "../../services/api";

const tratarErro = (err) => {
    if (err.response && err.response.data && err.response.data.error) {
        alert("Erro: " + err.response.data.error);
    } else {
        alert("Erro: Entre em contato com o desenvolvedor");
        console.error("Erro desconhecido:", err);
    }
};

export const sendCheckout = async (val) => {

    try {
        const response = await api.post('/checkout/register', val);
        const { message } = response.data
        alert(message);
        listGrupo()
        const res = await listCheckout();
        setListCheck(res.data);
        return response.data
    } catch (err) {

        // alert(err?.response?.data?.error)
        return []
    }
};

export const listCheckout = async () => {

    try {
        const response = await api.get('/checkout/listar');
        //console.log(response.data);
        return response.data;
    } catch (err) {
        //alert(err?.response?.data?.error)
        return []
    }
};