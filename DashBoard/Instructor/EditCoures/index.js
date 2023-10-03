import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import {
//   fetchCourseDetails,
  getFullDetailsOfCourse,
} from "../../../services/operations/courseDetailsAPI/courseDetailsAPI"
import { setCourse, setEditCourse } from "../../../redux/slices/courseReducer"
import RenderSteps from "../AddCourse/CourseDetails/RenderStep"

export default function EditCourse() {
  const dispatch = useDispatch()
  const  courseId  = useParams()
  console.log("courseID ",courseId.id);
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    (async () => {
      setLoading(true)
      const result = await getFullDetailsOfCourse(courseId.id, token)
      console.log("Result in edit section ",result);
      if (result?.courseDetails) {
        dispatch(setEditCourse(true))
        dispatch(setCourse(result?.courseDetails))
      }
      setLoading(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Course
      </h1>
      <div className="mx-auto max-w-[600px]">
        {course ? (
          <RenderSteps />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            Course not found
          </p>
        )}
      </div>
    </div>
  )
}