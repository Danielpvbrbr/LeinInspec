import { useContext, useState } from 'react'
import { Container, Area } from "./styles"
import { AuthContext } from '../../context/context'

export default function Login() {
  const { login, loading } = useContext(AuthContext);
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")


  const handlesubmit = () => {
    if (user && password) {
      login({
        user: user,
        password: password
      })
    } else {
      alert("Preencha o Campo!")
    }
  }

  return (
    <Container>
      <Area>
        <h4><span>Lein</span>Inspec</h4>
        <span>
          <p>Usuário</p>
          <input
            type='text'
            placeholder='Digite seu usuário'
            maxLength={10}
            value={user}
            onChange={e => setUser(e.target.value)}
          />
          <p>Usuário</p>
          <input
            type='password'
            placeholder='Digite sua senha'
            maxLength={6}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </span>

        <button onClick={handlesubmit}>{loading ? "Carregando.." : "Acessar"}</button>
      </Area>
    </Container>
  )
}

