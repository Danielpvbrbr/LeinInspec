import api from "../../services/api";

function gerarExpiracao() {
    const agora = new Date();
    const exp = new Date(agora.getTime() + 60 * 60 * 1000).toLocaleString(); // +1 hora
    return { agora, exp };
}

export const login = async (val, setAuth, setLoading) => {
    const { exp } = gerarExpiracao()
    setLoading(true);
    try {
        const response = await api.post('/auth', val);
        const { message, id, user } = response.data
        localStorage.setItem("auth", JSON.stringify({ id, user, exp }));
        setAuth({ id, user })
        // console.log(message);
        setLoading(false)
    } catch (err) {
        setLoading(false)
        console.log(err?.response?.data?.error)
        alert("Erro: Entre em contato com desenvolvedor")
    }
};

export const logout = (setAuth) => {
    localStorage.clear();
    setAuth(null);
};