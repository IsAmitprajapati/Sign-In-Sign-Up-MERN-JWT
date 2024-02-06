import logo from './logo.svg';
import './App.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

function App() {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  useEffect(()=>{
    navigate('user-profile')
  },[])

  return (
     <>
       <ToastContainer/>
       <main className='main'>
            <Outlet/>
       </main>
     </>
  );
}

export default App;
