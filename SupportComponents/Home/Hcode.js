import React from 'react'
import CTAbutton from './CTAbutton'
import { TypeAnimation } from 'react-type-animation'
const Hcode = ({position,heading,subheading,btn1,btn2,codeblock,colors}) => {
  return (
    <div className={`${position} flex  mx-auto w-[80%] gap-4 mt-8 items-center justify-between`}>
      <div className={` text-white w-[50%] flex flex-col gap-6 text-center items-center`}>
        {heading}
        {subheading}
       <div className='flex gap-2'>
        <CTAbutton  active={btn1.active} path={btn1.path}>
            {btn1.text}
        </CTAbutton>
        <CTAbutton active={btn2.active} path={btn2.path}>
            {btn2.text}
        </CTAbutton>
       </div>
      </div>
      <div className='flex flex-row w-[50%] gap-1 rounded-md bg-slate-600 p-2'>
              <div className=''>
                  <p>1</p>
                  <p>2</p>
                  <p>3</p>
                  <p>4</p>
                  <p>5</p>
                  <p>6</p>
                  <p>7</p>
                  <p>8</p>
                  <p>9</p>
                  <p>10</p>
                  <p>11</p>
              </div>
              <div className={`${colors} w-[90%]`} >
                  <TypeAnimation
                  sequence={[codeblock,1000,""]}
                  repeat={Infinity}
                  style={
                    {
                      whiteSpace:"pre-line",
                      display:"block"
                    }
                  }
                  omitDeletionAnimation={true}
      
                  />

              </div>
      </div>
    </div>
  )
}

export default Hcode
