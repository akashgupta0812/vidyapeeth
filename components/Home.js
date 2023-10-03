import React from 'react'
import {  NavLink } from 'react-router-dom'
import {FaArrowRight} from 'react-icons/fa'
import Hightlight from '../SupportComponents/Home/Hightlight'
import CTAbutton from '../SupportComponents/Home/CTAbutton'
import Hcode from '../SupportComponents/Home/Hcode'

import banner from '../assets/Images/banner.mp4'
import TimelineSection from '../SupportComponents/Home/TimelineSection'
import LearningLanguageSection from '../SupportComponents/Home/LearningLanguageSection '
// import ReviewSlider from '../SupportComponents/Home/ReviewSlider'
import InstructorSection from '../SupportComponents/Home/InstructorSection'
import Footer from '../SupportComponents/Home/Footer'
import ExploreSection from '../SupportComponents/Home/ExploreSection'
import ReviewSlider from '../SupportComponents/common/ReviewSlider'
const Home = () => { 
  return (
    <div className=''>

      <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between'>
            <NavLink to="/signup">
                <div className=' group mt-16 p1 mx-auto rounded-full 
            bg-slate-600 text-center transiton-all duration-300  hover:scale-95 w-fit   text-white '>
                    <div className='flex flex-row items-center 
                    group-hover:bg-slate-900 px-10 py-[5px] transition-all duration-200 rounded-full gap-2'>
                        <p>Become Instructor</p>
                        <FaArrowRight/>
                    
                    </div>
                </div>
            </NavLink>
            <div className=' mt-8 text-4xl'> 
                Empower Your Future Skills With
                <Hightlight text="Coding Skills"/>
            </div>
            <div className=' mt-3 text-slate-400 max-w-[850px] text-center'>
                With our online coding courses, you can learn at your pace, from anywhere in the world,and get access to a wealth of resources ,including hands-on projects and personalized feedback from instructor
            </div>
            <div className='flex flex-row gap-4 mt-3'>
                <CTAbutton active={1} path={"/learnmore "}>
                    Learn More
                    </CTAbutton>
                    <CTAbutton active={0} path={"demo"}>
                        Book Demo
                    </CTAbutton>
            </div>
            </div>
            
            {/* <div className='shadow-lg w-[50%] mx-auto  shadow-blue-800 h-[10px] absolute  ' ></div> */}
            {/* <div className= '  w-11/12 mt-4 mx-auto '> */}
                <video muted autoPlay loop className='w-11/12 mt-4 mx-auto shadow-[0_0_20px_0]  shadow-blue-800' >
                    <source src={banner} type='video/mp4'></source>
                </video>

            
            {/* </div> */}
            <Hcode   
              position={`flex-row`}
              heading={<div className='text-2xl'>
                Unlock Your  <Hightlight text="Coding Potential"/> with our online courses
              </div>}
              subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
              btn1={
                {
                  active:true,
                  path:"/signup",
                  text:"Try it Yourself"
            
                }

              }
              btn2={
                {
                    active:false,
                    path:"login",
                    text:"Book a Demo"
                }
              }
              codeblock={`<!DOCTYPE html> 
              <html> 
              <head> 
              <title>Page Title</title>  
              </head> 
              <body> 
              <h1>My First Heading</h1> 
              <p>My first paragraph</p> 
              </body> 
              </html>`}
              colors={`text-yellow-600`}
            >
            </Hcode>
            <Hcode   
              position={`flex-row-reverse`}
              heading={<div>
                Start Your <Hightlight text="Coding
                 Journey"/> Now With US
              </div>}
              subheading={"With our online coding courses, you can learn at your pace, from anywhere in the world"}
              btn1={
                {
                  active:true,
                  link:"/signup",
                  text:"Learn More"
            
                }

              }
              btn2={
                {
                    active:false,
                    link:"login",
                    text:"Book a Demo"
                }
              }
              codeblock={`<!DOCTYPE html> 
              <html> 
              <head> 
              <title>Page Title</title>  
              </head> 
              <body> 
              <h1>My First Heading</h1> 
              <p>My first paragraph</p> 
              </body> 
              </html>`}
              colors={`text-red-600`}
            >
            </Hcode>
            {/* {section 2} */}
            <div className='relative right-4  top-10 translate-y-10 '>
            <ExploreSection/>

            </div>
            {/* <Section2/> */}
            {/* {section3} */}
            {/* <FeaturesBox/> */}
            {/* section4 */}
            <div className='bg-white'>

            
            <div className='bg-white  w-11/12 flex gap-3 items mt-8  mx-auto justify-center p-7'>
              <div className='w-[50%] text-4xl mt-6'>
                  <h2>Get the Skills you need for a <Hightlight text="Job that is in demand"/>  </h2>
              </div>
              <div className='w-[50%] flex flex-col  mt-5 gap-5'>

                  <p className='text-2xl'>The modern VidyaPeeth is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                  <div className='w-fit'>

                  <CTAbutton active={1} path={"/learnmore "}>
                    Learn More
                    </CTAbutton>
                  </div>

              </div>
            </div>
            {/* {leadership section} */}
           
            <TimelineSection/>
            <LearningLanguageSection/>
            </div>
            <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>

<InstructorSection />

  <h2 className='text-center text-4xl font-semobold mt-10'>review from Other Learners</h2>
            {/* Review Slider here */}
            <ReviewSlider />
</div>


{/*Footer */}
<div className='bg-slate-900 text-white'>

<Footer />
</div>

</div>

       
 
 
  )
}

export default Home
