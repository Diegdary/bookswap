import { useState, useEffect } from 'react'
import axios, { AxiosRequestConfig } from 'axios';
import Nav from "./components/nav";
import './styles/template.css';
import './styles/inventario.css';


export default function Inventario() {
    const [libros, setLibros] = useState([{titulo:"",autor:"",valor_compra:"",fecha:""}]);

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

  const getLibros = async ()=>{
    const config:AxiosRequestConfig = {
        headers:{
            "Content-Type":"application/json"
        },
        withCredentials:true
    };
    const { data } = await axios.get("http://localhost:5000/api/control/librosdisponibles", config);
    console.log(data);
    setLibros(data);
  }

  useEffect(() => {
    loggedValidation();
    getLibros();
  },[]);
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
        <div className='content-inventario'>
            <div>
             <h1>Inventario</h1>   
            </div>
            
            <div className='lista-libros-disponibles'>
                {libros.map((item, index)=>(
                    <div key={index} className='disponible-item'>
                    <div>
                    <h2>Titulo: </h2><p>{item.titulo}</p>
                  </div>
                  <div>
                    <h2>Autor: </h2><p>{item.autor}</p>
                  </div>
                  <div>
                    <h2>Precio de compra:</h2><p>{item.valor_compra}</p>
                  </div>
                  <div>
                    <h2>Fecha: </h2><p>{item.fecha}</p>
                  </div>
                    </div>
                ))}
                
                
            </div>
        </div>
      </main>

    </>
  )
}
