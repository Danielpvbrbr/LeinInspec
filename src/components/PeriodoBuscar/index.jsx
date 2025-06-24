
import { useState } from 'react'
import { Container, InputSearch, Area } from "./styles"
import { BsSearch, BsFiletypePdf } from "react-icons/bs";

export default function PeriodoBuscar({
  search,
  setSearch,
  gerarPDF,
  listCheck,
  periodo,
  setPeriodo
}) {

  return (
    <Container>
      <InputSearch
        type='text'
        placeholder='Pesquisar...'
        value={search}
        onChange={setSearch}
      />

      <Area>
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
      </Area>

      {/* <div onClick={() => gerarPDF({ listCheck })}>
        <BsFiletypePdf cursor="pointer" color='#9b1515' size={24} />
      </div> */}
    </Container>
  )
}


