import React from 'react'
import {BsFillPersonFill} from 'react-icons/bs'
const Cards = ({data,setcourse,setcurrentcourse}) => {
  // console.log("setc ouorse ka value",setcourse);
  // console.log("data",data);
  return (
    <div className='rounded-lg p-3   text-white hover:shadow-lg hover:shadow-amber-500'>
     <p className='text-red-500'> {data.heading} </p> 
    <p className='text-left m-3 font-inter text-xl text-slate-400'>  {data.description}  </p>  
    <div className='border-dashed border-2 border-slate-300'></div>
    <div className='flex items-center justify-between gap-3 mt-4 '>
    <p className='flex gap-2 items-center'>
      
        <BsFillPersonFill/>  {data.level}
      
      </p> 
      <p className=''>
        <p> LessionNumber-{data.lessionNumber} </p> 
        </p> 
    </div>

     
    </div>
    // <div>
    //   {
    //   setcourse.map((ele,index)=>
    //   (
    //     <div>
    //       {ele.tag}
    //       <p>{ele.description}</p>
    //       <p>
    //         {ele.heading}
    //       </p>
    //       <p>
    //         {ele.level}
    //       </p>
    //       <p>
    //         {ele.lessionNumber}
    //       </p>
    //     </div>
    //   )
    //   )
    //   }
    // </div>
  )
}

export default Cards
