import React from 'react'
import CourseDetails from './CourseDetails'
import Cards from './Cards'
const FeaturesBox = () => {
    const Details=[
        {
            title:"html",
            des:"hey i am html course im very excited to have you",
            course:"RS 12654"
        },
        {
            title:"css",
            des:"CSSS is usefull for data",
            course:"bcjsbwdeohdhashpshdwjepdjwoejd;sjdwojedj"
        }
        ,{
            title:"cbsjjbcwddwe",
            des:"bjbsbhjcsjh 9www diwdewu ded09",
            course:"dkjs dosodjwdw"
        }
    ]
    // console.log(Details);

  return (
    <div className='bg-blue-800 text-white min-h-[100px] rounded-md'>
      <div>
        <CourseDetails  data={Details}/>
      </div>
      <Cards />
    </div>
  )
}

export default FeaturesBox
