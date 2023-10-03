import React from 'react'
// import CourseDetail from './CourseDetails/CourseDetail'
import RenderStep from './CourseDetails/RenderStep'
 export default  function  AddCourse () {
  return (
    <div className='flex gap-5 '>
      <div className='w-[65%]'>
        <div className='text-white p-2 mb-2 text-center text-2xl'>Add Course</div>
        <RenderStep/>
      </div>
      {/* course tips */}
      <div className="sticky top-10  max-w-[400px] flex-1 rounded-md border-[1px] border-slate-900 bg-slate-800 p-6 xl:block">
          <p className="mb-8 text-lg text-slate-400"> ⚡ Course Upload Tips</p>
          <ul className="ml-5 list-item list-disc space-y-4 text-xs text-slate-500">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>    
            <li>Information from the Additional Data section shows up on the course single page.</li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      {/* <CourseDetail/> */}
    </div>
  )
}


