import { Container, Input } from "./styles"

export default function InputUniversal({
  onChange,
  titulo,
  type,
  value,
  placeholder,
  maxLength,
  disabled,
  autoComplete
}) {


  return (
    <Container>
      <p style={{ marginTop: 3, marginBottom: 3 }}>{titulo}</p>
      <Input style={{
        backgroundColor: value && value.id ? "#89a0c2" : "#fff",
        color: value && value.id ? "#ffffff" : "#000000"
      }}>
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          maxLength={maxLength}
          disabled={disabled}
          autoComplete={autoComplete}
        />
        {value && value.id &&
          < h4 > {value.id}</h4>
        }
      </Input>
    </Container >
  )
}

