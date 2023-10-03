import React, { useState,useRef } from 'react'
// import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { Link, useNavigate } from 'react-router-dom'
// import { setToken } from '../redux/slices/authReducer'
// import { setUser } from '../redux/slices/profileReducer'
// import toast from 'react-hot-toast'
import {AiOutlineCaretDown} from 'react-icons/ai'
import { logout } from '../services/operations/Auth'
import useOnClickOutside from '../hooks/useOnClickOutside'
// import { NavLink } from 'react-router-dom'
const ProfileDropDown = () => {
  const { user } = useSelector((state) => state.profile)
  // const navigate=useNavigate()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  // const dispatch=useDispatch()
  // const {user}=useSelector((state)=>state.profile)
  // const [open,setopen]=useState(true)
  // const logout=()=>{
  //   toast.success("Logout Successfully")
  //   dispatch(setUser(null))
  //   localStorage.setItem("user",JSON.stringify(null))
  //   dispatch(setToken(null))
  //   localStorage.setItem("token",JSON.stringify(null))
  // }
  // console.log("user in  auth is  ",user);
  // console.log("image is  ",user.image);
  return (
  <div> 
    {/* <div className="flex items-center gap-x-1 cursor-pointer">
        <img 
          src={user?.image}
          onClick={() => setOpen(true)}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
    {/* <img   src={`${user.image}`}  onClick={logout}
    width={"50px"} height={40} className='aspect-square w-[30px] object-cover rounded-full' /> */}
    {/* {
        open && (
          <button className="relative" onClick={() => setOpen(true)}>
          <div className="flex items-center gap-x-1">
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className="aspect-square w-[30px] rounded-full object-cover"
            />
            <AiOutlineCaretDown className="text-sm text-richblack-100" />
          </div>
          {open && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
              ref={ref}
            >
              <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
                <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                  <VscDashboard className="text-lg" />
                  Dashboard
                </div>
              </Link>
              <div
                onClick={() => {
                  dispatch(logout(navigate))
                  setOpen(false)
                }}
                className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
              >
                <VscSignOut className="text-lg" />
                Logout
              </div>
            </div>
          )}
        </button>
        )
    } */}
  <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-slate-700 overflow-hidden rounded-md border-[1px] border-slate-700 bg-slate-800"
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-slate-100 hover:bg-slate-700 hover:text-slate-300">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-slate-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
     </div>
  
  )
}

export default ProfileDropDown
