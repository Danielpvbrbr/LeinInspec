import { useState, useContext, useEffect, useRef } from 'react'
import { Container, AreaForm, ContainerForm, Form, List, AreaPhoto, Input, AreaInput } from "./styles"
import { BsXLg } from "react-icons/bs";
import { AuthContext } from '../../context/context';

export default function Veículos() {
  const {
    sendVeiculo,
    listVeiculo,
    deleteVeiculo,
    atualizarVeiculo
  } = useContext(AuthContext)

  const [name, setName] = useState({ id: "", name: "" })
  const [placa, setPlaca] = useState("")
  const [list, setList] = useState([])
  const [imgB64, setImgB64] = useState('');
  const fotoRef = useRef(null)


  const handleSubmit = async () => {
    if (name) {
      if (name.id) {
        atualizarVeiculo({
          descricao: name.name,
          placa: placa.toLocaleUpperCase(),
          foto: imgB64,
          id: name.id
        })
      } else {
        sendVeiculo({
          descricao: name.name,
          placa: placa.toLocaleUpperCase(),
          foto: imgB64,
        })
      }

      setName({ id: "", name: "" })
      setPlaca("")
      setImgB64("")
      return await run()
    }

    alert("Campo veiculo/placa vazio! ")
  }

  useEffect(() => {
    run()
  }, [deleteVeiculo])

  async function run() {
    const res = await listVeiculo();
    setList(res.data);
  }

  function removerItem({ name, id }) {
    if (window.confirm(`Deseja realmente excluir ${name}?`)) {
      deleteVeiculo({ id: id })
      setName({ id: "", name: "" })
      setPlaca("")
      setImgB64("")
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImgB64(reader.result);
        e.target.value = '';
      };

      reader.readAsDataURL(file);
    }
  };

  function limparCampo() {
    setName({ id: "", name: "" });
    setPlaca("");
    setImgB64("");
  }

  return (
    <Container>
      <AreaForm>
        <legend>{name.id ? "Atualizar Registro" : "Adicionar Novo"}</legend>
        <ContainerForm>
          <Form>
            <AreaInput>
              <p style={{ marginTop: 3, marginBottom: 3 }}>Nome do Veiculo *</p>
              <Input style={{
                backgroundColor: name.id ? "#89a0c2" : "#fff",
                color: name.id ? "#ffffff" : "#000000"
              }}>
                <input
                  type='text'
                  value={name.name}
                  placeholder='Digite o nome do Veiculo...'
                  onChange={e => setName(prev => ({ ...prev, name: e.target.value }))}
                />
                {name.id && <h4>{name.id}</h4>}
              </Input>
            </AreaInput>

            <AreaInput>
              <p style={{ marginTop: 3, marginBottom: 3 }}>Placa do Veiculo</p>
              <Input style={{
                backgroundColor: name.id ? "#89a0c2" : "#fff",
                color: name.id ? "#ffffff" : "#000000"
              }}>
                <input
                  type='text'
                  value={placa.toLocaleUpperCase()}
                  placeholder='Digite a placa do Veículo...'
                  onChange={e => setPlaca(e.target.value)}
                  maxLength={7}
                />
                {name.id && <h4>{name.id}</h4>}
              </Input>
            </AreaInput>
          </Form>
          <AreaPhoto onClick={() => fotoRef.current.click()}>
            {imgB64 ?
              <img src={imgB64} alt="Preview" />
              :
              <p>Anexar foto</p>
            }

            <input
              style={{ display: `none` }}
              type='file'
              ref={fotoRef}
              accept="image/*"
              onChange={handleFileChange}
            />
          </AreaPhoto>
        </ContainerForm>

        <span>
          <button
            type='button'
            onClick={handleSubmit}
            style={{ background: "#39913d" }}
          >{name.id ? "Atualizar" : "Salvar"}</button>
          {name.id &&
            <button
              type='button'
              onClick={() => removerItem({ name: name.name, id: name.id })}
              style={{ background: "#ca5858" }}
            >Excluir</button>
          }
          {
            <button
              type='button'
              onClick={limparCampo}
              style={{ background: "#5886ca" }}
            >Limpar</button>
          }
        </span>
      </AreaForm>
      <List >
        <legend>Lista de Veículos</legend>
        {list.map((v, i) =>
          <section
            key={i}
            onClick={() => {
              setName({ id: v.id, name: v.descricao });
              setPlaca(v.placa);
              setImgB64(v.foto);
            }}
            style={{ background: v.id === name.id ? "#39913d" : "#46545E" }}
          >
            <h4>{v.descricao}</h4>
            <BsXLg
              color='#ffffff'
              onClick={(e) => {
                e.stopPropagation();
                removerItem({ name: v.descricao, id: v.id });
              }}
            />
          </section>
        )}
      </List>
    </Container >
  )
}

