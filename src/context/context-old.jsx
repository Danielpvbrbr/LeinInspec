import { createContext, useState, useEffect } from "react";
import api from "../services/api";
import expirado from "./func/expiration";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(false);
    const [listCheck, setListCheck] = useState([]);
    const [listGrupoArr, setListGrupoArr] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("auth");
        if (token) {
            const cookie = JSON.parse(token)
            setAuth(cookie)
            if (expirado(cookie.exp)) {
                alert("Tempo expirado!")
                logout()
            }
        }
    }, []);

    function gerarExpiracao() {
        const agora = new Date();
        const exp = new Date(agora.getTime() + 60 * 60 * 1000).toLocaleString(); // +1 hora
        return { agora, exp };
    }

    const login = async (val) => {
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

    //------------------------------------------------------------------------------------------------------
    const sendUsuarios = async (val) => {
        setLoading(true);
        try {
            const response = await api.post('/usuarios/register', val);
            const { message } = response.data
            alert(message);
            listUsuarios()
            setLoading(false)
            return response.data
        } catch (err) {
            setLoading(false)
            alert(err?.response?.data?.error)
            return []
        }
    };

    const listUsuarios = async (val) => {
        setLoading(true);
        try {
            const response = await api.get('/usuarios/listar');
            //console.log(response.data);
            setLoading(false)
            return response.data;
        } catch (err) {
            setLoading(false)
            alert(err?.response?.data?.error)
            return []
        }
    };

    const atualizarUsuarios = async (val) => {
        setLoading(true);
        try {
            const response = await api.post('/usuarios/atualizar', val);
            const { message } = response.data
            alert(message);
            listUsuarios()
            setLoading(false)
        } catch (err) {
            setLoading(false)
            alert(err?.response?.data?.error)
            return []
        }
    };

    const deleteUsuarios = async (val) => {
        setLoading(true);
        try {
            const response = await api.post('/usuarios/delete', val);
            const { message } = response.data
            alert(message);
            listUsuarios()
            setLoading(false)
        } catch (err) {
            setLoading(false)
            alert(err?.response?.data?.error)
            return []
        }
    };

    //------------------------------------------------------------------------------------------------------
    const sendMotorista = async (val) => {
        setLoading(true);
        try {
            const response = await api.post('/motorista/register', val);
            const { message } = response.data
            alert(message);
            listMotorista()
            setLoading(false)
        } catch (err) {
            setLoading(false)
            alert(err?.response?.data?.error)
            return []
        }
    };
    const deleteMotorista = async (val) => {
        setLoading(true);
        try {
            const response = await api.post('/motorista/delete', val);
            const { message } = response.data
            alert(message);
            listMotorista()
            setLoading(false)
        } catch (err) {
            setLoading(false)
            alert(err?.response?.data?.error)
            return []
        }
    };

    const atualizarMotorista = async (val) => {
        setLoading(true);
        try {
            const response = await api.post('/motorista/atualizar', val);
            const { message } = response.data
            alert(message);
            listMotorista()
            setLoading(false)
        } catch (err) {
            setLoading(false)
            alert(err?.response?.data?.error)
            return []
        }
    };

    const listMotorista = async (val) => {
        setLoading(true);
        try {
            const response = await api.get('/motorista/listar');
            //console.log(response.data);
            setLoading(false)
            return response.data;
        } catch (err) {
            setLoading(false)
            console.log(err?.response)
            return []
        }
    };
    //------------------------------------------------------------------------------------------------------
    const sendVeiculo = async (val) => {
        setLoading(true);
        try {
            const response = await api.post('/veiculo/register', val);
            const { message } = response.data
            alert(message);
            listVeiculo()
            setLoading(false)
        } catch (err) {
            setLoading(false)
            alert(err?.response?.data?.error)
            return []
        }
    };
    const deleteVeiculo = async (val) => {
        setLoading(true);
        try {
            const response = await api.post('/veiculo/delete', val);
            const { message } = response.data
            alert(message);
            listVeiculo()
            setLoading(false)
        } catch (err) {
            setLoading(false)
            alert(err?.response?.data?.error)
            return []
        }
    };

    const atualizarVeiculo = async (val) => {
        setLoading(true);
        try {
            const response = await api.post('/veiculo/atualizar', val);
            const { message } = response.data
            alert(message);
            listVeiculo()
            setLoading(false)
        } catch (err) {
            setLoading(false)
            alert(err?.response?.data?.error)
            return []
        }
    };

    const listVeiculo = async (val) => {
        setLoading(true);
        try {
            const response = await api.get('/veiculo/listar');
            //console.log(response.data);
            setLoading(false)
            return response.data;
        } catch (err) {
            setLoading(false)
            alert(err?.response?.data?.error)
            return []
        }
    };
    //------------------------------------------------------------------------------------------------------
    const sendGrupo = async (val) => {
        setLoading(true);
        try {
            const response = await api.post('/grupo/register', val);
            const { message } = response.data
            alert(message);
            listGrupo()
            setLoading(false)
        } catch (err) {
            setLoading(false)
            alert(err?.response?.data?.error)
            return []
        }
    };

    const deleteGrupo = async (val) => {
        setLoading(true);
        try {
            const response = await api.post('/grupo/delete', val);
            const { message } = response.data
            alert(message);
            listGrupo()
            setLoading(false)
        } catch (err) {
            setLoading(false)
            alert(err?.response?.data?.error)
            return []
        }
    };

    const atualizarGrupo = async (val) => {
        setLoading(true);
        try {
            const response = await api.post('/grupo/atualizar', val);
            const { message } = response.data
            alert(message);
            listGrupo()
            setLoading(false)
        } catch (err) {
            setLoading(false)
            alert(err?.response?.data?.error)
            return []
        }
    };

    const listGrupo = async (val) => {
        setLoading(true);
        try {
            const response = await api.get('/grupo/listar');
            //console.log(response.data);
            setLoading(false)
            return response.data;
        } catch (err) {
            setLoading(false)
            alert(err?.response?.data?.error)
            return []
        }
    };

    //------------------------------------------------------------------------------------------------------
    const sendCheckout = async (val) => {
        setLoading(true);
        try {
            const response = await api.post('/checkout/register', val);
            const { message } = response.data
            alert(message);
            listGrupo()
            setLoading(false)
            const res = await listCheckout();
            setListCheck(res.data);
            return response.data
        } catch (err) {
            setLoading(false)
            alert(err?.response?.data?.error)
            return []
        }
    };

    const listCheckout = async (val) => {
        setLoading(true);
        try {
            const response = await api.get('/checkout/listar');
            //console.log(response.data);
            setLoading(false)
            return response.data;
        } catch (err) {
            setLoading(false)
            alert(err?.response?.data?.error)
            return []
        }
    };

    //------------------------------------------------------------------------------------------------------
    const sendManutencao = async (val) => {
        setLoading(true);
        try {
            const response = await api.post('/manutencao/register', val);
            const { message } = response.data
            alert(message);
            listManutencao()
            setLoading(false)
        } catch (err) {
            setLoading(false)
            alert(err?.response?.data?.error)
            return []
        }
    };

    const deleteManutencao = async (val) => {
        setLoading(true);
        try {
            const response = await api.post('/manutencao/delete', val);
            const { message } = response.data
            alert(message);
            listManutencao()
            setLoading(false)
        } catch (err) {
            setLoading(false)
            alert(err?.response?.data?.error)
            return []
        }
    };

    const atualizarManutencao = async (val) => {
        setLoading(true);
        try {
            const response = await api.post('/manutencao/atualizar', val);
            const { message } = response.data
            alert(message);
            listManutencao()
            setLoading(false)
        } catch (err) {
            setLoading(false)
            alert(err?.response?.data?.error)
            return []
        }
    };

    const listManutencao = async (val) => {
        setLoading(true);
        try {
            const response = await api.get('/manutencao/listar');
            //console.log(response.data);
            setLoading(false)
            return response.data;
        } catch (err) {
            setLoading(false)
            console.log(err?.response)
            return []
        }
    };

    //------------------------------------------------------------------------------------------------------
    const sendOficina = async (val) => {
        setLoading(true);
        try {
            const response = await api.post('/oficina/register', val);
            const { message } = response.data
            alert(message);
            listOficina()
            setLoading(false)
        } catch (err) {
            setLoading(false)
            alert(err?.response?.data?.error)
            return []
        }
    };
    const deleteOficina = async (val) => {
        setLoading(true);
        try {
            const response = await api.post('/oficina/delete', val);
            const { message } = response.data
            alert(message);
            listOficina()
            setLoading(false)
        } catch (err) {
            setLoading(false)
            alert(err?.response?.data?.error)
            return []
        }
    };

    const atualizarOficina = async (val) => {
        setLoading(true);
        try {
            const response = await api.post('/oficina/atualizar', val);
            const { message } = response.data
            alert(message);
            listOficina()
            setLoading(false)
        } catch (err) {
            setLoading(false)
            alert(err?.response?.data?.error)
            return []
        }
    };

    const listOficina = async (val) => {
        setLoading(true);
        try {
            const response = await api.get('/oficina/listar');
            //console.log(response.data);
            setLoading(false)
            return response.data;
        } catch (err) {
            setLoading(false)
            console.log(err?.response)
            return []
        }
    };

    const logout = () => {
        localStorage.clear();
        setAuth(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user: auth,
                isAuthenticated: !!auth,
                login,
                logout,
                loading,
                sendMotorista,
                deleteMotorista,
                atualizarMotorista,
                listMotorista,
                sendVeiculo,
                deleteVeiculo,
                atualizarVeiculo,
                listVeiculo,
                sendGrupo,
                atualizarGrupo,
                deleteGrupo,
                listGrupo,
                sendCheckout,
                listCheckout,
                sendUsuarios,
                listUsuarios,
                atualizarUsuarios,
                deleteUsuarios,
                listCheck,
                setListCheck,
                listGrupoArr,
                setListGrupoArr,
                sendManutencao,
                deleteManutencao,
                atualizarManutencao,
                listManutencao,
                sendOficina,
                deleteOficina,
                atualizarOficina,
                listOficina
            }}
        >
            {children}
        </AuthContext.Provider >
    );
}
