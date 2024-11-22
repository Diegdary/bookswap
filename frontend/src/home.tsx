import { useState, useEffect } from 'react'
import axios, { AxiosRequestConfig } from 'axios';
import Nav from "./components/nav";
import './styles/template.css';
import './styles/home.css';
import CompraIcon from './assets/Untitled-1-01.png';
import VentaIcon from './assets/Untitled-1-02.png';

export default function Home() {
  const loggedValidation = async () => {
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    };
    const logged = await axios.get("http://localhost:5000/api/session/vlogin", config);
    console.log(logged)
    if (logged.data.logged == 0) {
      console.log("not logged");
      window.location.replace("/");
    }
  }

  useEffect(() => {
    loggedValidation();
  });
  return (
    <>
      <Nav></Nav>
      <main className='home-main'>
        <h1>Buscar Libros</h1>
        <div className='look-box'>

          <input id='clue' type="text" placeholder='100 años de soledad...' />


          <button id='startSearch'>
            <i className="fa-solid fa-magnifying-glass"></i>
            <p>Buscar</p>
          </button>
        </div>
        <div className='content-home'>
          <div className='both-sides left'>
            <h1 className='title'>Compra más reciente</h1>
            <div className='book-information'>
              <div>
                <h2>Titulo: </h2><p></p>
              </div>
              <div>
                <h2>Autor: </h2><p></p>
              </div>
              <div>
                <h2>Precio de compra:</h2><p></p>
              </div>
              <div>
                <h2>Fecha: </h2><p></p>
              </div>
            </div>
            <button id="comprar">
              Comprar
              <img className='icons' alt="" />
            </button>
          </div>
          <div className='both-sides right'>
            <h1 className='title'>Venta más reciente</h1>
            <div className='book-information'>
              <div>
                <h2>Titulo: </h2><p></p>
              </div>
              <div>
                <h2>Autor: </h2><p></p>
              </div>
              <div>
                <h2>Precio de compra:</h2><p>asd</p>
              </div>
              <div>
              <h2>Precio de venta:</h2><p>asd</p>
              </div>
              <div>
                <h2>Fecha: </h2><p></p>
              </div>

            </div>
            <button id="vender">
              Vender
              <img className='icons' alt="" />
            </button>
          </div>
        </div>
      </main>

    </>
  )
}
