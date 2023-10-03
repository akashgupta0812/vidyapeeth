import React, { useEffect, useState } from 'react'


import { Link, useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import OtpInput from 'react-otp-input'
import { useDispatch ,useSelector} from 'react-redux'

import { signup } from '../../services/operations/Auth'
const OtpSection = () => {
  const [otp,setOtp]=useState("")
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const { setsignupdata } = useSelector((state) => state.auth);
  useEffect(()=>{
    if(!setsignupdata)
    {
      navigate("/signup");
    }
  },[])
  function handleotpsubmit(e)
  { 
    // console.log("otp ",otp);
    e.preventDefault()
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    }=setsignupdata
   
    dispatch(signup(
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
      navigate
    ))
  }
  return (
    <div className='flex flex-col items-center justify-center w-11/12 mx-auto gap-3'>
      <h1 className='text-2xl text-white'>Verify Email</h1>
      <p className='text-slate-500 '> A verification code has been sent to you. Enter the code below</p>
      <form onSubmit={handleotpsubmit}>
      <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button
              type="submit"
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >
              Verify Email
            </button>
      </form>
    
      <Link to="/login">
              <p className="flex items-center gap-x-2 text-white">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
    </div>
  )
}

export default OtpSection
