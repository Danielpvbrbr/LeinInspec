// import { useContext, useState } from 'react'
import { Container, List } from "./styles"
// import { AuthContext } from '../../context/context';
import logo from "../../../public/logo.svg"
import { version } from "../../../package.json";

export default function Inicio() {
  // const { user } = useContext(AuthContext);

  return (
    <Container>
      <List>
        <img src={logo} alt="EyeCheck" />
        <p>Sistema de Inspeção e Controle Veicular</p>
        <p style={{ fontSize: 12 }}>{version}</p>
      </List>
    </Container>
  );
}
