import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../../services/operations/courseDetailsAPI/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../../redux/slices/viewCourseReducer';
import VideoDetailsSidebar from '../ViewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../../components/ViewCourse/CourseReviewModal';

const ViewCourse = () => {

    const [reviewModal, setReviewModal] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    console.log("course Dta ");
    useEffect(()=> {
      console.log(":inside fun ction ");
      const setCourseSpecificDetails = async() => {
        const courseData = await getFullDetailsOfCourse(courseId, token);
        console.log("course Dta ",courseData);
        console.log("course ",courseData.courseDetails.CourseContent);
        console.log("courseData.courseDetails ",courseData.courseDetails);
        console.log("courseData.completedVideos  ",courseData.completedVideos);
              dispatch(setCourseSectionData(courseData.courseDetails.CourseContent));
              
              dispatch(setEntireCourseData(courseData.courseDetails));
              dispatch(setCompletedLectures(courseData.completedVideos));
              let lectures = 0;
              courseData?.courseDetails?.CourseContent?.forEach((sec) => {
                lectures += sec.subSection.length
              })  
              dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseSpecificDetails();
    },[]);


  return (
    <>
        <div className='relative flex min-h-[calc(100vh-3.5rem)] '>
            <VideoDetailsSidebar setReviewModal={setReviewModal} className="w-[20%]"/>
          <div className="h-[100vh] flex-1 overflow-auto ">
            <div className="mx-6 my-5">
              <Outlet />
            </div>
          </div>
            {reviewModal && (<CourseReviewModal setReviewModal={setReviewModal} />)}
        </div>
        
         
    </>
  )
}

export default ViewCourse