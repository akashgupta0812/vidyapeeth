// import React, { useState } from 'react'
import { Link, NavLink, matchPath, useLocation } from 'react-router-dom'
import Vidyapeeth from '../../assets/Images/vidyapeeth logo.jpeg'
import {BsArrowDownCircle} from 'react-icons/bs'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropDown from '../../Auth/ProfileDropDown'
import { useEffect, useState } from 'react'
// import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import {AiOutlineMenu} from 'react-icons/ai'
import { apiConnector } from '../../services/apiconnector'
import toast from 'react-hot-toast'
// import { useState } from 'react'
const NavbarDetails=[
    {
        title:"Home",
        path:"/"
    },
    {
        title:"Catalog",
        path:"/catalog"
    }
    ,
    {
        title:"About Us",
        path:"/about-us"
    }
    ,
    // {
    //     title:"Contact Us",
    //     path:"/contact-us"
    // }
    
    
]

const NavBar = () => {
    const [CourseDetails,setcourseDetails]=useState([]);
// const CourseDetails=[
//     "Python",
//     "WEd Devlopment",
//     "Machine Learning"
// ]
useEffect(async()=>{
    try{
    const result=await apiConnector("GET",categories.CATEGORIES_API)
    console.log("result ",result);
    if(!result.data.success) 
    throw new Error(result.data.message)
        setcourseDetails(result.data.data);
    }   catch(err)
    {
        toast.error("failed fetchhing ")
    }  
},[])
    // const [currenttab,setcurrenttab]=useState("Home");
    // const [active,setactive]=useState(false);
    const location=useLocation()
   const matchroute=(route)=>{
        return matchPath({path:route},location.pathname)
   }
   const {user}=useSelector((state)=>state.profile)
   const {totalItems}=useSelector((state)=>state.cart)
   const {token}=useSelector((state)=>state.auth)

//    console.log("user   totalItems toekn",user,totalItems ,token );
//    const [subLink,setSSublink]=useState([]);
//    const [loader,setloader]=useState(true);
//    async function fetchData(){
//     try{ 

//         const result=await apiConnector("GET",Categories.CATEGORIES_API)
//         setSSublink(( result).data.data)
//         setloader(false);
//     }catch(err)
//     {

//     }
//    }
//    useEffect(()=>{
//     fetchData();
//    },[])
//     // function setdata(val)
    // {
    //     setcurrenttab(val);
    //     // if(val==="Catalog")
    //     // setactive(true);
    // // else 
    // // setactive(false)
    // }
  return (
    <div className='w-11/12 mx-auto p-1 flex gap-6 items-center justify-between  text-white'>
    <NavLink to={"/"}>
        <img    className='h-[50px] w-[150px] rounded-md' src={Vidyapeeth} alt='img.png'/>
    </NavLink>
    
        <div className='flex  p-2 gap-10 '>
            { 
                 NavbarDetails.map((ele,index)=>(
                    <nav  key={index} className='text-white mx-auto  '> 
                    { 
                    ele.title==="Catalog"  ?( 
            
                            <div className=' ' >
                        <div className='group cursor-pointer relative flex flex-col gap-1 items-center'>
                            <div className= 'group flex  items-center gap-2'>
                            <p>Catalog</p>
                            <BsArrowDownCircle className=''/>
                            </div>
                           <div className= {`    invisible  group-hover:opacity-100  opacity-0  absolute left-[50%] translate-x-[-50%]  top-[98%] flex flex-col roundend-md group-hover:visible group-hover:z-50  transition-all duration-200`}>
                           <div className='   flex flex-col '>
                            <div className=' h-[20px] w-[20px] translate-x-36 translate-y-3 -rotate-45 z-[-1] bg-white'></div>
                            <div className='rounded-md w-[250px] p-2 h-fit bg-white text-black'>
                                

                    
                                {
                                    
                                   CourseDetails.length===0 ?(<div>Loadding</div>): CourseDetails.map((ele,index)=>(
                                        <NavLink key={index} to={`/course/${ele.name.toLowerCase().split(' ').join('-')}`}>

                                            <p key={index}  className={`hover:bg-slate-400 p-1 rounded-sm`}>{ele.name}</p>
                                        </NavLink>
                                            
                                    ))
                                }
                            </div>
                            </div>
                           </div>
                           
                            
                        </div>
                    </div>
                        
                    ):(<div className=''>
                         <NavLink to={ ele.title==="Home"?( "/"):(ele.path.toLowerCase())} >
                            <li className={`list-none ${ matchroute(ele.path) ?("text-yellow-400"):(" ")} `} >
                           {ele.title}
                            </li>
                        </NavLink>
                    </div>)
                    }
                       
                    </nav>
                ))
            }
        </div>
           {/* login/signup/dashboard/profile */}
           <div className='flex gap-5  items-center'>
            {
                token===null && (
                    <div className='flex gap-2'>
                         <NavLink to={"/login"}>
                        <button className='px-3 py-1 border border-black rounded-md transition-all duration-200 hover:scale-95  bg-slate-700 text-slate-500 hover:bg-slate-900   hover:text-slate-400'>
                            Log in
                        </button>
                    </NavLink>
                    <NavLink to={"/signup"}>
                    <button className=' border border-black px-3 py-1 rounded-md transition-all duration-200 hover:scale-95  bg-slate-700 text-slate-500 hover:bg-slate-900   hover:text-slate-400'>
                        Sign up
                    </button>
                </NavLink>
                    </div>
                   
                )
            }
            {
                user!==null && user.accountType!=="Instructor" && (
                    <Link to={"/dashboard/cart"}  className='relative flex items-center'>
                        <AiOutlineShoppingCart size={40} className='z-10'/>
                        {
                            totalItems>0 && (
                                <span  className=' absolute  -top-2 left-5 z-10 rounded-full px-2 bg-green-600 text-white'>
                                    {totalItems}
                                </span>
                            )
                        }
                    </Link>
                
                )
            }
            {
                token!==null && (
                    <ProfileDropDown/>
                )
            }
           </div>
           <button className="mr-4 md:hidden">
            
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>

    
    </div>
  )
}

export default NavBar
