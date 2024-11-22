import { useState, useEffect } from 'react'
import axios, { AxiosRequestConfig } from 'axios';
import './index.css';
import { redirect } from 'react-router-dom';
import logo from './assets/Untitled-1-03.png';
import './styles/App.css';


function App() {
  const [count, setCount] = useState(0);

  const loggedValidation = async ()=>{
    const config: AxiosRequestConfig = {
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true
    };
    const logged = await axios.get("http://localhost:5000/api/session/vlogin",config);
    console.log(logged)
    if(logged.data.logged == 1){
      window.location.replace("/home");
    }
  }

  useEffect(()=>{
    loggedValidation();
  });


  const isLogged = async ()=>{
    const {data} = await axios.post("http://localhost:5000/api/session/login",document.querySelector('#onlyform'),{
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
  console.log(data);
    if(data.success == 1){
      window.location.replace("/home");
    }
    else{
      document.getElementById("auth")!.innerHTML= "Usuario o contraseña incorrectos";
    }
  }


  return (
    <div className='main'>
      <div className='nav'>
         <div>
            <img src={logo} alt="" id='logo'/>
         </div>
       </div>
      <div className='content-login'>
        <form method="post" id='onlyform'>
          <h1>Iniciar Sesión</h1>
          <section>
            <label >E-mail</label>
            <input type="email" id='email' name='email'/>
          </section>
          <section>
            <label >Password</label>
            <input type="password" id='password' name='password'/>
          </section>
          <p id='auth'></p>
          
          <button type='button' onClick={isLogged}>Iniciar</button>
        </form>
      </div>
    </div>
  )
}

export default App
