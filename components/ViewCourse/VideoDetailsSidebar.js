import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../SupportComponents/common/IconBtn';

const VideoDetailsSidebar = ({setReviewModal}) => {

    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const {sectionId, subSectionId} = useParams();
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state)=>state.viewCourse);
    // console.log();
    console.log("video details swction ",courseSectionData, courseEntireData,
        totalNoOfLectures,
        completedLectures,);
    useEffect(()=> {
        const setActiveFlags = () => {
            if(!courseSectionData.length)
                return;
            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data) => data._id === subSectionId
            )
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
            //set current section here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            //set current sub-section here
            setVideoBarActive(activeSubSectionId);
        }
        setActiveFlags();
    },[courseSectionData, courseEntireData, location.pathname])

    const handleAddReview = () => {
        console.log("I am inside Add handleAddReview")
        setReviewModal(true);
    }

  return (
    <>
        <div className='text-white flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 '>
            {/* for buttons and headings */}
            <div>
                {/* for buttons */}
                <div>
                    <div 
                    onClick={()=> {
                        navigate("/dashboard/enrolled-courses")
                    }}
                    >
                        Back
                    </div>

                    <div>
                        <IconBtn 
                            text="Add Review"
                            onclick={()=>handleAddReview()}
                        />
                    </div>

                </div>
                {/* for heading or title */}
                <div>
                    <p>{courseEntireData?.CourseName}</p>
                    <p>{completedLectures?.length} / {totalNoOfLectures}</p>
                </div>
            </div>

            {/* for sections and subSections */}
            <div>
                {
                    courseSectionData.map((course, index)=> (
                        <div
                        onClick={() => setActiveStatus(course?._id)}
                        key={index}
                        >

                            {/* section */}

                            <div>
                                <div>
                                    {course?.sectionName}
                                </div>
                                {/* HW- add icon here and handle rotate 180 logic */}
                            </div>

                            {/* subSections */}
                            <div>
                                {
                                    activeStatus === course?._id && (
                                        <div>
                                            {
                                                course.subSection.map((topic, index) => (
                                                    <div
                                                    className={`flex gap-5 p-5 ${
                                                        videoBarActive === topic._id
                                                        ? "bg-yellow-200 text-richblack-900"
                                                        : "bg-richblack-900 text-white"
                                                    }`}
                                                    key={index}
                                                    onClick={() => {
                                                        navigate(
                                                            `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                                                        )
                                                        setVideoBarActive(topic?._id);
                                                    }}
                                                    >
                                                        <input
                                                        type='checkbox'
                                                        checked= {completedLectures.includes(topic?._id)}
                                                        onChange={() => {}}
                                                        />
                                                        <span>
                                                            {topic.title}
                                                        </span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
  
  )
}

export default VideoDetailsSidebar