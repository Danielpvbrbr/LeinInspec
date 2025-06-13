import { useState } from 'react'
import { Container } from "./styles"
import { BsList } from "react-icons/bs";

export default function Header({ onClick }) {

  return (
    <Container>
      <section>
        <BsList
          fontSize={35}
          color='#fff'
          cursor="pointer"
          onClick={onClick}
        />
      </section>
      <div>
       <h4><span>Lein</span>Inspec</h4>
      </div>
    </Container>
  )
}

