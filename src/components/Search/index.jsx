import { useState } from 'react'
import { Container } from "./styles"
import { BsSearch, BsFiletypePdf } from "react-icons/bs";

export default function Search({
  search,
  setSearch,
  gerarPDF,
  listCheck,
  periodo,
  setPeriodo
}) {

  return (
    <Container>
      <input
        type='text'
        placeholder='Pesquisar...'
        value={search}
        onChange={setSearch}
      />

      <span>
        <input
          type='date'
          value={periodo.start}
          onChange={e => setPeriodo({ start: e.target.value, end: periodo.end })}
        />
        a
        <input
          type='date'
          value={periodo.end}
          onChange={e => setPeriodo({ start: periodo.start, end: e.target.value })}
        />
      </span>

      <div onClick={() => gerarPDF({ listCheck })}>
        <BsFiletypePdf cursor="pointer" color='#9b1515' size={24} />
      </div>
    </Container>
  )
}

