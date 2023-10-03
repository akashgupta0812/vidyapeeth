import React from 'react'
import * as Icons from "react-icons/vsc"
// import { useSelector } from 'react-redux'
import { NavLink, matchPath, useLocation } from 'react-router-dom'
const SideBar = ({sublink,icon,type}) => {
  // const handle=(id)=>{
  //   ansi(id);
  // }
  // const {user}=useSelector((state)=>state.profile)
  const location =useLocation();
  const matchroute=(route)=>{
    return matchPath({path:route},location.pathname)
}
//  const  handletab=(id)=>{
//     ansi(id)
//   }
  const Icon=Icons[icon]
  return (
    
    <NavLink to={sublink.path}>
      <div className={` flex gap-2 w-full pl-4 py-1 items-center text-white ${matchroute(sublink.path)?"bg-yellow-500 text-black":""} `} 
      >
        <Icon className="text-slate-400"/>
        <span className=''>
          {sublink.name}
        </span>
    </div>

    </NavLink>
      
  )
}

export default SideBar
