import { useState, useEffect } from 'react'
import axios from 'axios';
import Nav from "./components/nav"; 
import './styles/template.css';

export default function Home() {
  return (
    <div>
      <Nav></Nav>
      <h1>Buscar Libros</h1>
      <div className='look'>
        <input id='clue' type="text" placeholder='100 años de soledad...'/>
        <button id='startSearch'>
        <i className="fa-solid fa-magnifying-glass"></i>
          <p>Buscar</p>
        </button>
      </div>
      <div>

      </div>
    </div>
  )
}
