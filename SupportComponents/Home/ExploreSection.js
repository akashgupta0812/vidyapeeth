import React, { useState } from 'react'
import { HomePageExplore } from '../../data/ExploreSection'
import Hightlight from './Hightlight'
import Cards from './Cards'
const Timeline=[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]
const ExploreSection = () => {
 
    const [currentTab,setcurrentTab]=useState(Timeline[0])
    // console.log(Timeline[0]);
    const [course,setcourse]=useState(HomePageExplore[0].courses)
    // console.log(HomePageExplore[0].courses[0]);
    const [currentcourse,setcurrentcourse]=useState(HomePageExplore[0].courses[0].heading)

    // console.log(HomePageExplore[0].courses);
    function handletab(val)
    { 
        setcurrentTab(val);
        let result=HomePageExplore.filter((course)=>
            course.tag===val
        )
        // console.log(result);
        setcourse(result[0].courses);
        // console.log(" printing ",result[0].courses);
        setcurrentcourse(result[0].courses[0].heading)
        // console.log(result[0].courses[0].heading);
    }
    // console.log("course ka value",course);
  return (
    <div className='  flex flex-col mt-7 gap-3 mx-auto w-11/12 text-center'>
               <div>
                <h2 className='text-4xl'>Unlock the <Hightlight text="Power of Code
"/> </h2>
               </div>
                <p className='text-slate-600 text-2xl'>Learn to Build Anything You Can Imagine </p>
                <div className='flex flex-row gap-8 mx-auto rounded-full p-2 text-white bg-slate-700'>
                    {
                        Timeline.map((ele,index)=>{
                            return (
                                <div  key={index} className={  
                                   
                                    ` cursor-pointer ${currentTab===ele?" bg-slate-900 rounded-full p-2  ":"rounded-full p-2 "}`
                                }
                                onClick={()=>{
                                    handletab(ele)
                                }}
                                >
                                    {ele}
                                </div>

                            )
                        })
                    }
                </div>
                <div className="flex flex-col gap-4 md:gap-2 md:flex-row">
                    {
                        course.map((ele,index)=>(
                            <div key={index} className='m-2   mb-3 flex rounded-lg shadow-lg shadow-black  transition-all duration-200 hover:scale-95 bg-slate-900  flex-col gap-5' >
                              
                                
                                <Cards data={ele}
                                // courses={course}
                                setcourse={course}
                                setcurrentcourse={currentcourse}

                                />

                               
                                </div>
                        ))
                    }
                    </div>   
                                 

                                
                        
                


    </div>
  )
}

export default ExploreSection
