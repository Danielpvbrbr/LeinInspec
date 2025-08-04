import { useState } from 'react'
import { Container } from "./styles"
import { BsList } from "react-icons/bs";
import { BsFillEnvelopeFill } from "react-icons/bs";

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
        <h4><span>Eye</span>Check</h4>
      </div>
     {/* <BsFillEnvelopeFill size={30} color='#fff' className='msg' /> */}
      {/* <p>2</p> */}
    </Container>
  ) 
}

