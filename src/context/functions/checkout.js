import api from "../../services/api";

export const sendCheckout = async (val) => {

    try {
        const response = await api.post('/checkout/register', val);
        const { message } = response.data
        alert(message);
        await listCheckout();
        return response.data
    } catch (err) {
        //alert("Erro: Entre em contato com desenvolvedor")
        return []
    }
};

export const listCheckout = async () => {

    try {
        const response = await api.get('/checkout/listar');
        //console.log(response.data);
        return response.data;
    } catch (err) {
        // alert("Erro: Entre em contato com desenvolvedor")
        return []
    }
};