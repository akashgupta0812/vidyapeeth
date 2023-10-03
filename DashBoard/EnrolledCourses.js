import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ProgressBar from "@ramonak/react-progress-bar"
import { getUserEnrolledCourses } from '../services/operations/ProfileAPI/ProfileApi'
const EnrolledCourses = () => {
  const {token}=useSelector((state)=>state.auth)
  // console.log("topken iin enrolled ",token);
  const [enrolledCourses, setEnrolledCourses] = useState(null)
  const navigate=useNavigate();
  const getEnrolledCourses=async()=>{
      try{ 
        // console.log("token in fun ",token);
        const res=await getUserEnrolledCourses(token)
          // console.log("res in " ,res);
        setEnrolledCourses(res);

      }
      catch(err)
      {
        console.log("Could not fetch enrolled courses.")

      }
  }
  useEffect(() => {
    getEnrolledCourses();
  },[token])

  return (
    <>
    <div className="text-3xl text-white">Enrolled Courses</div>
    {!enrolledCourses ? (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    ) : !enrolledCourses.length ? (
      <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
        You have not enrolled in any course yet.
        {/* TODO: Modify this Empty State */}
      </p>
    ) : (
      <div className="my-8 text-white">
        {/* Headings */}
        <div className="flex rounded-t-lg bg-richblack-500 ">
          <p className="w-[45%] px-5 py-3">Course Name</p>
          <p className="w-1/4 px-2 py-3">Duration</p>
          <p className="flex-1 px-2 py-3">Progress</p>
        </div>
        {/* Course Names */}
        {enrolledCourses.map((course, i, arr) => (
          <div
            className={`flex items-center border border-slate-700 ${
              i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
            }`}
            key={i}
          >
            <div
              className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
              onClick={() => {
              navigate(
                  `/view-course/${course?._id}/section/${course.CourseContent?.[0]?._id}/sub-section/${course.CourseContent?.[0]?.subSection?.[0]?._id}`
                )
              }}
            >
              <img
                src={course.thumbnail}
                alt="course_img"
                className="h-14 w-14 rounded-lg object-cover"
              />
              <div className="flex max-w-xs flex-col gap-2">
                <p className="font-semibold">{course.courseName}</p>
                <p className="text-xs text-richblack-300">
                  {course.CourseDescription.length > 50
                    ? `${course.CourseDescription.slice(0, 50)}...`
                    : course.CourseDescription}
                </p>
              </div>
            </div>
            <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
            <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
              <p>Progress: {course.progressPercentage || 0}%</p>
              <ProgressBar
                completed={course.progressPercentage || 0}
                height="8px"
                isLabelVisible={false}
              />
            </div>
          </div>
        ))}
      </div>
    )}
  </>
  )
}

export default EnrolledCourses
