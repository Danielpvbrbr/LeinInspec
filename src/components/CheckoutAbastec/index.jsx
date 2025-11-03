import { useState, useEffect, useContext, useRef } from 'react'
import { Container, Area, Header, InfoOption, List, Action, InputKM, Foto } from "./styles"
import { AuthContext } from '../../context/context'
import SelectVeiculo from '../SelectVeiculo'
// import { formatDate } from '../functions/formatDate'

export default function CheckoutAbastec({ isForm2, setIsForm2 }) {
  const { user, sendAbastecimento } = useContext(AuthContext)
  const camRef1 = useRef(null)
  const camRef2 = useRef(null)
  const [veiculo, setVeiculo] = useState("")
  const [placa, setPlaca] = useState("")
  const [litros, setLitros] = useState("")
  const [precoFinal, setPrecoFinal] = useState("")
  const [precoLitro, setPrecoLitro] = useState("")
  const [kmAtual, setKmAtual] = useState("")

  const [fotoBomba, setFotoBomba] = useState("")
  const [fotoHodometro, setFotoHodometro] = useState("")

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  function formatCurrency(value) {
    let v = value.replace(/\D/g, "");
    v = (v / 100).toFixed(2) + "";
    v = v.replace(".", ",");
    v = v.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return "R$ " + v;
  }

  function calcularPrecoPorLitro(litros, precoFinal) {
    const valLitros = Number(litros);
    const valPreco = Number(precoFinal.replace(/\D/g, "")) / 100;
    if (!valLitros || !valPreco || valLitros <= 0) return "";
    const result = (valPreco / valLitros).toFixed(2);
    return result.replace(".", ",");
  }

  const handleSubmit = async () => {
    if (!veiculo || !litros || !precoFinal || !kmAtual) {
      alert("Preencha veículo, litros, preço final e KM atual.")
      return
    }

    const res = await sendAbastecimento({
      veiculo,
      placa,
      usuario: user.user,
      fotoBomba,
      fotoHodometro,
      litros,
      precoFinal,
      precoLitro,
      kmAtual
    })

    if (res) limpar()
  }

  function limpar() {
    setVeiculo("")
    setPlaca("")
    setLitros("")
    setPrecoFinal("")
    setPrecoLitro("")
    setKmAtual("")
    setFotoBomba("")
    setFotoHodometro("")
  }


  return (
    <Container isForm={isForm2 ? "flex" : "none"}>
      <Area>
        <Header>
          <h4>Abastecimento do Veículo</h4>
        </Header>

        <InfoOption>
          <section>
            <Foto onClick={() => camRef1.current.click()}>
              {fotoBomba
                ? <img src={fotoBomba} alt="bomba" style={{ width: 90, height: 90, borderRadius: 8 }} />
                : "Tirar Foto! Bomba"
              }
              <input
                type='file'
                accept="image/*"
                capture="environment"
                ref={camRef1}
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const base64 = await toBase64(file);
                  setFotoBomba(base64);
                }}
              />
            </Foto>

            <Foto onClick={() => camRef2.current.click()}>
              {fotoHodometro
                ? <img src={fotoHodometro} alt="hodometro" style={{ width: 90, height: 90, borderRadius: 8 }} />
                : "Tirar Foto! Hodômetro"
              }
              <input
                type='file'
                accept="image/*"
                capture="environment"
                ref={camRef2}
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const base64 = await toBase64(file);
                  setFotoHodometro(base64);
                }}
              />
            </Foto>
          </section>

          <SelectVeiculo
            veiculo={veiculo}
            setVeiculo={setVeiculo}
            setPlaca={setPlaca}
          />

          <div className='boxInpt'>
            <div>
              <p>Qtd. Litros</p>
              <InputKM
                type='number'
                value={litros}
                placeholder='00'
                onChange={e => {
                  const val = e.target.value;
                  setLitros(val);
                  setPrecoLitro(calcularPrecoPorLitro(val, precoFinal));
                }}
              />
            </div>

            <div>
              <p>Preço final</p>
              <InputKM
                type='text'
                value={precoFinal}
                placeholder='R$ 0,00'
                onChange={e => {
                  const val = formatCurrency(e.target.value);
                  setPrecoFinal(val);
                  setPrecoLitro(calcularPrecoPorLitro(litros, val));
                }}
              />
            </div>

            <div>
              <p>Preço litro</p>
              <InputKM
                type='text'
                value={precoLitro}
                placeholder='0,00'
                disabled
              />
            </div>

            <div>
              <p>KM Atual</p>
              <InputKM
                type='number'
                value={kmAtual}
                placeholder='Informe KM'
                onChange={e => setKmAtual(e.target.value)}
              />
            </div>
          </div>
        </InfoOption>

        <List />

        <Action>
          <button style={{ background: "#479470" }} onClick={handleSubmit}>Finalizar</button>
          <button style={{ background: "#496B83" }} onClick={() => setIsForm2(false)}>Fechar</button>
        </Action>
      </Area>
    </Container>
  )
}
