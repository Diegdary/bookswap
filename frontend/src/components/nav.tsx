import React from 'react';
import "./../styles/nav.css";
import logo from './../assets/Untitled-1-03.png';

export default function Nav() {
  return (
    <div id='nav'>
        <a className='nav-item' href="http://">
            <img src={logo} alt="" id='logo'/>
         </a>
         <div className='nav-item'><a href="http://">Inventario</a></div>
         <div className='nav-item'><a href="http://">Ventas</a></div>
         <div className='nav-item'><a href="http://">Compras</a></div>
         <div className='nav-item'><a href="http://">Registrar Empleados</a></div>
         <div className='nav-item'><a href="http://">Registrar Venta</a></div>
         <div className='nav-item'><a href="http://">Registrar Compra</a></div>
         <div className='nav-item last'><a href="/profile">Perfil</a></div>
         
         
         
         
    </div>
  )
}


