import {useState, useEffect} from "react";
import Nav from './components/nav';
import pf from './assets/samuel1-01.png';
import "./styles/profile.css";
import axios, { AxiosRequestConfig } from "axios";

export default function Profile() {
    const [infoUser, SetInfoUser] = useState({nombre:"",telefono:"",direccion:"",tipo:""});

    const getUser = async ()=>{
        const {data} = await axios.get("http://localhost:5000/api/session/info",{withCredentials:true});
        console.log(data);
        if(data.successful == 0){
            alert("user not found");
            return;
        }
       SetInfoUser(data.user);
    }

    const logOut = async ()=>{
        const config: AxiosRequestConfig = {
            headers:{
                "Type-Content":"application/json"
            },
            withCredentials:true
        };
        await axios.delete("http://localhost:5000/api/session/exit",config);
        window.location.replace("/");
    }
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

    useEffect(()=>{
        loggedValidation();
        getUser();
        
    },[]);
  return (
    <>
          <Nav></Nav>
          <main className='profile-structure'>
              <div className='partition'>
                  <article id='editIcon'>
                      <i className="fa-solid fa-pen-to-square"></i>
                  </article>
                  <article className='display'>
                      <section className='left-side'>
                          <div className='circle'>
                              <img src={pf} id='profilePicture' alt="" />
                          </div>
                      </section>
                      <section className='right-side'>
                          <h1>Mi perfil</h1>
                          <div className="row">
                            <h2 id='Nombre'>Nombre: </h2><p>{infoUser.nombre}</p>
                            </div>
                        <div className="row">
                             <h2 id='Telefono'>Telefono: </h2><p>{infoUser.telefono}</p>
                        </div>
                        <div className="row">
                             <h2 id='Dirección'>Dirección: </h2><p>{infoUser.direccion}</p>
                        </div>
                        <div className="row">
                             <h2 id='Tipo'>Tipo: </h2><p>{infoUser.tipo}</p>
                        </div>
                        <div className="row logout-container">
                             <button id="logOut" onClick={logOut}>
                                Cerrar Sesión
                             </button>
                        </div>
                          
                          
                          
                          
                      </section>
                  </article>
              </div>


            
        </main>
        
    </>
  )
}
