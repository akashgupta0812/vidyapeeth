import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { getPasswordResetToken } from '../../services/operations/Auth'
const ForgotPassword = () => {
  const dispatch=useDispatch();
    const {loading}=useSelector((state)=>state.auth)
    const [emailSent,setEmailSent]=useState(false)
    const [email,setemail]=useState("");
    const handleOnSubmit = (e) => {
        e.preventDefault()
        // console.log("printihn email********* ",email);
        dispatch(getPasswordResetToken(email, setEmailSent))
      }
    
  return (
    <div>
      {
        loading?(
            <div className='text-3xl flex justify-center items-center h-[60vh] text-white'>Loading...</div>
        ):(
            <div className=' flex flex-col w-[60%] mt-12 mx-auto gap-2 '>
                 <h1 className='text-white text-2xl '>
            {
              !emailSent ? "Reset Your Password":"Check Your Email"
            }
        </h1>
        <p className='text-slate-400 text-2xl'>
         {!emailSent
            ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
            : `We have sent the reset email to ${email}`
            }
        </p>
        <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="w-full">
                <p className="mb-2 text-[20px] leading-[1.375rem] text-slate-500">
                  Email Address <sup className="text-red-500">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="Enter email address"
                  className="form-style w-[80%] px-2 py-1 rounded-sm"
                />
              </label>
            )}
            <button
              type="submit"
              className="mt-6 w-[200px] rounded-[8px] bg-yellow-600 py-[12px] px-[12px] font-medium hover:scale-95 transition-all duration-200"
            >
              {!emailSent ? "Sumbit" : "Resend Email"}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-white">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
            </div>
       
        )
      }
    </div>
  )
}

export default ForgotPassword
