import React, { useState } from 'react'
import LockIcons from '../components/icons/LockIcons'
import EyesOpen from '../components/icons/EyesOpen'
import EyesClose from '../components/icons/EyesClose'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Signin = () => {
    const [showPassword,setShowPassword] = useState(false)
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState({
        email : "",
        password : ""
    })
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const {name, value} = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }


    const handleSubmit = async(e) => {
        e.preventDefault()

        const response = await fetch('http://localhost:8080/api/sign-in',{
            method : 'post',
            headers : {
                "content-type" : 'application/json'
            },
            body : JSON.stringify(data)
        })

        const dataResponse = await response.json()

        console.log("dataREspnse",dataResponse)

        if(dataResponse.error){
            toast.error(dataResponse.message)
        }

        if(dataResponse.success){
            toast.success(dataResponse.message)
            localStorage.setItem('token',dataResponse.token)
            navigate('/user-profile')
        }
    }


    console.log("data",data)

  return (
    <div className='h-screen-center'>
        <div className='card-from'>
            <div className='card-header'>
                <div className='lock-icons'>
                    <LockIcons/>
                </div>
            </div>

            <form className='form' onSubmit={handleSubmit}>
                <div className='form-element'>
                    <label htmlFor='email'>Email</label>
                    <div className='input-container'>
                        <input type='email' id='email' name='email' value={data.email} disabled={loading} onChange={handleOnChange}/>
                    </div>
                </div>

               <div className='form-element'>
                    <label htmlFor='password'>Password</label>
                    <div className='input-container'>
                         <input type={showPassword ? "text" : "password"} id='password' value={data.password} name='password' disabled={loading} onChange={handleOnChange}/>
                         <div className='icons-password' onClick={()=>setShowPassword(preve => !preve)}>
                            {
                                showPassword ? <EyesOpen/> :  <EyesClose/>
                            }
                         </div>
                    </div>
               </div>

                <button className='btn-sign'>
                    {
                        loading ? "Loading..." : "Sign In"
                    }
                </button>
            </form>

            <p>Don't have account <Link to={"/sign-up"} className='link'>Sign Up ?</Link></p>
        </div>
    </div>
  )
}

export default Signin