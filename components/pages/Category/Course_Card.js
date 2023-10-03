import React, { useEffect, useState } from 'react'
import RatingStars from './RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const Course_Card = ({course, Height}) => {

    // console.log("course in course card ",course);
    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])


    
  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className="">
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt="course thumnail"
              className={`${Height} w-full rounded-xl object-cover `}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-xl text-slate-300">{course?.courseName}</p>
            <p className="text-sm text-slate-500">
              {course?.Instructor?.firstName} {course?.Instructor?.lastName}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-slate-400">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <p className="text-xl text-slate-300">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Course_Card