import { useState, useEffect } from 'react'
import axios from 'axios';
import './styles/App.css';
import './index.css';
import { redirect } from 'react-router-dom';
import logo from './assets/Untitled-1-03.png';


function App() {
  const [count, setCount] = useState(0);




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
      <div className='content'>
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
