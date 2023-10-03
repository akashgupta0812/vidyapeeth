
import React from 'react'
import { useSelector } from 'react-redux'
import {FaCheck} from 'react-icons/fa'
import CourseBuilderForm from '../CourseDetails/Components/CourseBuilder/CourseBuilderForm'
import PublishCourse from './PublishCourse'
import CourseInformationForm from './CourseInformationForm'
const RenderStep = () => {
    const steps = [
        {
          id: 1,
          title: "Course Information",
        },
        {
          id: 2,
          title: "Course Builder",
        },
        {
          id: 3,
          title: "Publish",
        },
      ]
    
    const {step}=useSelector((state)=>state.course);


  return (
    <div className=''>
    <div className="relative mb-2 flex w-full justify-center">
        {steps.map((item) => (
          <>
            <div
              className="flex flex-col items-center "
              key={item.id}
            >
              <button
                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                  step === item.id
                    ? "border-yellow-500 bg-yellow-900 text-yellow-500"
                    : "border-slate-700 bg-slate-800 text-slate-300"
                } ${step > item.id && "bg-yellow-500 text-yellow-400"}} `}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-richblack-900" />
                ) : (
                  item.id
                )}
              </button>
              
            </div>
            {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                  step > item.id  ? "border-yellow-500" : "border-slate-500"
                } `}
                ></div>
              </>
            )}
          </>
        ))}
      </div>
      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <>
            <div
              className="flex min-w-[130px] flex-col items-center gap-y-2"
              key={item.id}
            >
              
              <p
                className={`text-sm ${
                  step >= item.id ? "text-slate-500" : "text-slate-300"
                }`}
              >
                {item.title}
              </p>
            </div>
            
          </>
        ))}
      </div>
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm/>}
      {step === 3 &&  <PublishCourse /> }
    </div>
  )
}

export default RenderStep
