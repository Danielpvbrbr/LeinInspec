import { createContext, useState, useEffect } from "react";
import api from "../services/api";
import expirado from "./functions/expiration";

import {
    login as loginFunction,
    logout as logoutFunction
} from "./functions/auth";


import {
    sendUsuarios as sendUsuariosFunction,
    listUsuarios as listUsuariosFunction,
    atualizarUsuarios as atualizarUsuariosFunction,
    deleteUsuarios as deleteUsuariosFunction
} from "./functions/user";

import {
    sendOficina as sendOficinaFunction,
    listOficina as listOficinaFunction,
    atualizarOficina as atualizarOficinaFunction,
    deleteOficina as deleteOficinaFunction
} from "./functions/oficina";

import {
    sendMotorista as sendMotoristaFunction,
    listMotorista as listMotoristaFunction,
    atualizarMotorista as atualizarMotoristaFunction,
    deleteMotorista as deleteMotoristaFunction
} from "./functions/motorista";

import {
    sendVeiculo as sendVeiculoFunction,
    listVeiculo as listVeiculoFunction,
    atualizarVeiculo as atualizarVeiculoFunction,
    deleteVeiculo as deleteVeiculoFunction
} from "./functions/veiculo";

import {
    sendGrupo as sendGrupoFunction,
    listGrupo as listGrupoFunction,
    atualizarGrupo as atualizarGrupoFunction,
    deleteGrupo as deleteGrupoFunction
} from "./functions/grupo";

import {
    sendManutencao as sendManutencaoFunction,
    listManutencao as listManutencaoFunction,
    atualizarManutencao as atualizarManutencaoFunction,
    deleteManutencao as deleteManutencaoFunction
} from "./functions/manutencao";

import {
    sendCheckout as sendCheckoutFunction,
    listCheckout as listCheckoutFunction,
} from "./functions/checkout";

import {
    sendDefeito as sendDefeitoFunction,
    listDefeito as listDefeitoFunction,
    atualizarDefeito as atualizarDefeitoFunction,
    deleteDefeito as deleteDefeitoFunction
} from "./functions/notificarDefeito";
export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(false);
    const [listCheck, setListCheck] = useState([]);
    const [listGrupoArr, setListGrupoArr] = useState([])

    const login = (val) => loginFunction(val, setAuth, setLoading);
    const logout = () => logoutFunction(setAuth);

    const sendUsuarios = (val) => sendUsuariosFunction(val,);
    const listUsuarios = () => listUsuariosFunction();
    const atualizarUsuarios = (val) => atualizarUsuariosFunction(val);
    const deleteUsuarios = (val) => deleteUsuariosFunction(val);

    const sendOficina = (val) => sendOficinaFunction(val);
    const listOficina = () => listOficinaFunction();
    const atualizarOficina = (val) => atualizarOficinaFunction(val);
    const deleteOficina = (val) => deleteOficinaFunction(val);

    const sendMotorista = (val) => sendMotoristaFunction(val);
    const listMotorista = () => listMotoristaFunction();
    const atualizarMotorista = (val) => atualizarMotoristaFunction(val);
    const deleteMotorista = (val) => deleteMotoristaFunction(val);

    const sendVeiculo = (val) => sendVeiculoFunction(val);
    const listVeiculo = () => listVeiculoFunction();
    const atualizarVeiculo = (val) => atualizarVeiculoFunction(val);
    const deleteVeiculo = (val) => deleteVeiculoFunction(val);

    const sendGrupo = (val) => sendGrupoFunction(val);
    const listGrupo = () => listGrupoFunction();
    const atualizarGrupo = (val) => atualizarGrupoFunction(val);
    const deleteGrupo = (val) => deleteGrupoFunction(val);

    const sendManutencao = (val) => sendManutencaoFunction(val);
    const listManutencao = () => listManutencaoFunction();
    const atualizarManutencao = (val) => atualizarManutencaoFunction(val);
    const deleteManutencao = (val) => deleteManutencaoFunction(val);

    const sendCheckout = (val) => sendCheckoutFunction(val);
    const listCheckout = () => listCheckoutFunction();

    const sendDefeito = (val) => sendDefeitoFunction(val);
    const listDefeito = () => listDefeitoFunction();
    const atualizarDefeito = (val) => atualizarDefeitoFunction(val);
    const deleteDefeito = (val) => deleteDefeitoFunction(val);

    useEffect(() => {
        const token = localStorage.getItem("auth");
        if (token) {
            const cookie = JSON.parse(token);
            setAuth(cookie);

            if (expirado(cookie.exp)) {
                // alert("Tempo expirado!");
                logout(); // Aqui é logout, não deslogar
            }
        }
        getlistDefeito()
        getNotificacao()
    }, []);

    const getNotificacao = async () => {
        try {
            const res1 = await api.get("/notificacao");
            const res2 = await listDefeito();
            return { res1: res1?.data?.data, res2: res2?.data };
        } catch (err) {
            return { res1: [], res2: [] };
        }
    }

    async function getlistDefeito() {

    }

    const isVisible = (rota) => {
        const liberado = JSON.parse(auth.liberadoArr)

        if (auth.tipo === 0) {
            return liberado.includes(rota)
        }

        return true
    }

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
                listOficina,
                sendDefeito,
                listDefeito,
                atualizarDefeito,
                deleteDefeito,
                isVisible,
                getlistDefeito,
                getNotificacao
            }}
        >
            {children}
        </AuthContext.Provider >
    );
}
