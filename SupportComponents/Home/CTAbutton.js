import React from 'react'
import { NavLink } from 'react-router-dom'

const CTAbutton = ({children,active,path}) => {
  return (
    <NavLink to={path}>
                 <div className={`text-center  py-3 px-6 text-[13px]   rounded-md font-bold text-white 
    ${ active? "bg-amber-400 hover:bg-amber-500 transition-all duration-200 " : "bg-slate-600 hover:bg-slate-900 transition-all duration-200"  } hover:scale-95
`}>
      {children}
    </div>
    </NavLink>
   
  )
}

export default CTAbutton

