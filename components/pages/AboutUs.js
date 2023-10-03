import React from 'react'
import aboutus1 from '../../assets/Images/aboutus1.webp'
import aboutus2 from '../../assets/Images/aboutus2.webp'
import aboutus3 from '../../assets/Images/aboutus3.webp'
import Hightlight from '../../SupportComponents/Home/Hightlight'
import FoundingStory from "../../assets/Images/FoundingStory.png"
import Footer from "../../SupportComponents/Home/Footer"
import StatsComponenet from './StatsComponenet'

import  ContactFormSection from '../pages/ContactFormSection'
import ReviewSlider from '../../SupportComponents/common/ReviewSlider'
const AboutUs = () => {
  return (
    <div className='bg-slate-700'>
        {/* grey div */}
      <div className= 'relative bg-slate-700'>
      <div className=' pt-10 flex flex-col mx-auto items-center justify-center w-11/12'>
       <div className='flex flex-col items-center justify-center mx-auto max-w-[700px]'>
       <h1 className='text-4xl text-white text-center'>Driving Innovation in Online Education for a <Hightlight text={"Brighter Future"}></Hightlight> </h1>
        <p className='m-3 text-slate-400 text-center'>VidyaPeeth is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community</p>
       </div>
       </div>
        <div className=' translate-y-[40px] flex w-full gap-3 justify-center items-center'>
            <img src={aboutus1} className='w-[30%] rounded-md' alt="about1" />
            <img src={aboutus2} className='w-[30%] rounded-md ' alt="about2" />
            <img src={aboutus3} className='w-[30%] rounded-md' alt="about3"/>
        </div>
      
      </div> 
      <div className=' border-b bg-black border-slate-600 h-[300px] text-white '>
        <p className='translate-y-[100px] w-11/12 text-4xl mx-auto text-center'>We are passionate about revolutionizing the way we learn. Our innovative platform <Hightlight text={"combines technology,"}></Hightlight>  <span className='bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold'>expertise,</span> and community to create <span className='bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold'>an unparalleled educational experience.</span> </p>
      </div>
      {/* <div className='w-screen h-[2px] bg-slate-400'></div> */}
      <div className=' bg-black text-white' >
      <div className='w-11/12 mx-auto pt-5 flex items-center justify-between py-30'>
        <div className='flex flex-col gap-4  text-slate-500 w-[52%]' >
        <h1 className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] h-fit p-1'>Our Founding Story
          </h1>
          <p>
          Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
          </p>
          <p>
          As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
          </p>
        </div>
        <img src={FoundingStory} className='w-[38%] shadow-[0_0_20px_0] shadow-[#FC6767]'/>
      </div>
      {/*  */}
      <div className="flex  w-11/12 mx-auto flex-col items-center lg:gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Vision
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
              Our Mission
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
              Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
        <StatsComponenet />
        
        {/* <LearningGrid /> */}
        <ContactFormSection />
        <div className='m-3'>
           <h1  className='text-3xl text-white text-center'>Review From Learners</h1> 
      <ReviewSlider/>
        </div>
        <div className='bg-slate-900 text-slate-500' >
        <Footer/>
        </div>
      </div>
    // </div>
  )
}

export default AboutUs
