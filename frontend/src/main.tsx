import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.tsx'
import Home from './home.tsx';
import Profile from './profile.tsx';
import Inventario from './inventario.tsx';

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />
  },
  {
    path:"/home",
    element: <Home />
  },
  {
    path:"/profile",
    element: <Profile />
  },
  {
    path:"/inventario",
    element: <Inventario />
  }

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>,
)
