import React, { useState } from 'react'
import { useDispatch} from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { changePassword } from '../../services/operations/Auth';
const ChangePassword = () => {
    // const {token}=useSelector((state)=>state.auth)
    const location =useLocation()
    // console.log("token in comp as props " ,token);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [formData,setformData]=useState(
        {
            password:"",
            confirmpassword:""
        }
        )
        const handleOnChange = (e) => {
            setformData((prevData) => ({
                ...prevData,
                [e.target.name]: e.target.value,
            }))
        }
        const handleform=(e)=>{
            e.preventDefault();
            console.log(formData);
            const {password,confirmpassword}=formData
            
            // console.log("dispathc k just phele ",token);
            const token=location.pathname.split("/").at(-1);
        dispatch(changePassword(password,confirmpassword,navigate,token))
    }
  return (
    <div className='flex flex-col mx-auto w-11/12 items-center justify-center mt-14'>
     <div className='  relative flex flex-col border-solid border-2 mt-11 w-[40%] border-blue-50 gap-2  p-10 rounded-md '>
        <div  className='rounded-full h-[40px] w-[50px] bg-yellow-600 absolute ' ></div>
        <p className='text-white text-left  flex  w-[70%] '>Password must contain one lowercase letter,one number and be atleast 6 characters long. </p>
        <form onSubmit={handleform} className='flex flex-col'>
            <label>
                <p className='text-blue-400 leading-4 mb-3'>Password</p>   
            <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleOnChange}
            />
              </label>  
              <label> 
                <p className='text-blue-400 leading-4 mt-4 mb-3'>Confirm Password  </p>   
            <input
            type="password"
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleOnChange}
            />
              </label> 
              <button className='m-2 w-fit p-2 rounded-md border-solid border-2 border-black bg-yellow-500' type='submit'>
                Change Password 
              </button>
        </form>
     </div>
    </div>
  )
}

export default ChangePassword
