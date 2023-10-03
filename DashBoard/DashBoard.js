import React, { useState } from 'react'
import SideBar from './SideBar'
// import SideBarComponent from './SideBarComponent'
import {sidebarLinks} from '../data/dashboard-links'
import { Outlet, useNavigate } from 'react-router-dom'
import {VscSignOut} from 'react-icons/vsc'
import ConfirmationModal from './ConfirmationalModal'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../services/operations/Auth'
// import { NavLink } from 'react-router-dom'
const DashBoard = () => {
  // h-[calc(100vh-3.5rem)] 
  const {user}=useSelector((state)=>state.profile)
  // console.log("user in dashbp ",user);

  // console.log("user ka acc ",user.accountType);
  // const [acctype,setacctype]=useState(null);
  // user.accounType==="Student"?setacctype("Student"):setacctype("Instructor")
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const setting={
    name:"Settings",path:"/dashboard/settings",
    icon:"VscSettingsGear"
  }
  const [confirmationModal,setConfirmationModal]=useState(null)
  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
        <div className='bg-slate-900 w-[200px]  border-r-[1.5px] h-[calc(100vh-3.5rem)]  border-slate-400'>
            <div className='mt-5  mx-auto'>
              {
                sidebarLinks.map((ele,index)=>
{
  if(user && ele.type && ele.type!==user.accountType) return null;
  return (
    <div className={`  `}>
    {
     <SideBar key={index} sublink={ele} icon={ele.icon} type={ele.type}/>
     } 
     {/* console.log("ele ka type ",ele) */}
   </div> 
  )
}
                  
                )
              }
              <div className=' mt-2 bg-slate-800 h-[1.5px] w-full mb-6'></div>
              <SideBar sublink={setting} icon={setting.icon}/>
              <div onClick={()=>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })}
              className=' flex gap-2 w-full pl-4 py-1 items-center text-slate-300 hover:cursor-pointer'>
                <VscSignOut/>
                Logout
              </div>
              
                {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
              
            </div>
            </div>
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashBoard
