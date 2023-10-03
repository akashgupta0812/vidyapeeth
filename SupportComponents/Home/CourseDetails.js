import React from 'react'

const CourseDetails = ({data}) => {
    // console.log(props.data);
  return (
    <div className='flex  items-center justify-center gap-3 mt-3 '>
      {
      data.map((index,key)=>
         (
            <div className={`${
                index.title=="html"? "  cursor-pointer rounded-md hover:scale-95 transition-all duration-200 p-2 bg-black text-white ":"text-red-500"}`}>
                {index.title}
            </div>
           
                
        )
      )
      }
    </div>
  )
}
// cursor-pointer rounded-md hover:scale-95 transition-all duration-200 p-2 hover:bg-black hover:text-white 

export default CourseDetails
