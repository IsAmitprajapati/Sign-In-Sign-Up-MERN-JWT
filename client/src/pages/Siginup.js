import React, { useState } from 'react'
import LockIcons from '../components/icons/LockIcons'
import EyesOpen from '../components/icons/EyesOpen'
import EyesClose from '../components/icons/EyesClose'
import { Link, useNavigate } from 'react-router-dom'
import imageToBase64 from '../helpers/imageToBase64'
import { toast } from 'react-toastify'

const Siginup = () => {
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassoword,setShowConfirmPassword] = useState(false)
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState({
        name : "",
        email : "",
        password : "",
        confirmPassword : "",
        profilePic : ""
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


    const handleUploadFile = async(e) => {
        const file = e.target.files[0]
        let Image64 = ""

        if(file?.name){
            console.log(file)
         Image64 = await imageToBase64(file)
        }

     

        setData((preve)=>{
            return{
                ...preve,
                profilePic : Image64
            }
        })

        console.log("imageToBase64",Image64)
    }   


    const handleSubmit = async(e) => {
        e.preventDefault()

        if(data.password !== data.confirmPassword){
            toast.error("Password and comfirm password must be same !")
            return
        }

        setLoading(true)
        const response = await fetch("http://localhost:8080/api/sign-up",{
            method : "post",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })
        const dataRespnse = await response.json()
        setLoading(false)
        console.log("dataRespnse",dataRespnse)

        if(dataRespnse.error){
            toast.error(dataRespnse.message)
        }

        if(dataRespnse.success){
            toast.success(dataRespnse.message)
            setData({
                name : "",
                email : "",
                password : "",
                confirmPassword : "",
                profilePic : ""
            })
            navigate('/sign-in')
        }



    }


    console.log("data",data)

  return (
    <div className='h-screen-center'>
        <div className='card-from'>
            <div className='card-header'>
                
                    
                        <div className='sign-form-lock-container'>
                            
                            {
                                data.profilePic ? (
                                    <img src={data.profilePic} className='profile-pic'/>
                                )
                                : 
                                <div className='lock-icons'>
                                    <LockIcons/>
                                </div>
                            }
                                <form>
                                    <label htmlFor='upload-pic-input'>
                                        <div className='upload-pic-text'>Upload Pic</div>
                                        <input type='file' id='upload-pic-input' onChange={handleUploadFile} />
                                    </label>
                                </form>
                                
                            
                        </div>
                    
                    
              
            </div>

            <form className='form' onSubmit={handleSubmit}>

                <div className='form-element'>
                    <label htmlFor='name'>Name :</label>
                    <div className='input-container'>
                        <input type='text' id='name' name='name' value={data.name} disabled={loading} onChange={handleOnChange}/>
                    </div>
                </div>


                <div className='form-element'>
                    <label htmlFor='email'>Email :</label>
                    <div className='input-container'>
                        <input type='email' id='email' name='email' value={data.email} disabled={loading} onChange={handleOnChange}/>
                    </div>
                </div>

               <div className='form-element'>
                    <label htmlFor='password'>Password :</label>
                    <div className='input-container'>
                         <input type={showPassword ? "text" : "password"} id='password' value={data.password} name='password' disabled={loading} onChange={handleOnChange}/>
                         <div className='icons-password' onClick={()=>setShowPassword(preve => !preve)}>
                            {
                                showPassword ? <EyesOpen/> :  <EyesClose/>
                            }
                         </div>
                    </div>
               </div>

               <div className='form-element'>
                    <label htmlFor='confirmPassword'>Confirm Password :</label>
                    <div className='input-container'>
                         <input type={showConfirmPassoword ? "text" : "password"} id='confirmPassword' value={data.confirmPassword} name='confirmPassword' disabled={loading} onChange={handleOnChange}/>
                         <div className='icons-password' onClick={()=>setShowConfirmPassword(preve => !preve)}>
                            {
                                showConfirmPassoword ? <EyesOpen/> :  <EyesClose/>
                            }
                         </div>
                    </div>
               </div>

                <button className='btn-sign'>
                    {
                        loading ? "Loading..." : "Sign Up"
                    }
                </button>
            </form>

            <p>Already have account <Link to={"/sign-in"} className='link'>Sign In ?</Link></p>
        </div>
    </div>
  )
}


export default Siginup