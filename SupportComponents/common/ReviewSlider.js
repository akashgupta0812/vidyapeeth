import React, { useEffect, useState } from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// import { Autoplay,FreeMode, Pagination}  from 'swiper/modules'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// import { Autoplay, Pagination, FreeMode, A11y } from 'swiper/modules';
import ReactStars from "react-rating-stars-component"
import { apiConnector } from '../../services/apiconnector'
import { ratingsEndpoints } from '../../services/apis'
import { FaStar } from 'react-icons/fa'


const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;


    useEffect(() => {
        const fetchAllReviews = async() => {
            const {data} = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
            console.log("LOgging response in rating", data);
            console.log("data ka data ",data.data);
            if(data?.success) {
                setReviews(data?.data);
            }

            console.log("Printing Reviews", reviews);

        }
        fetchAllReviews();
    }, []);


  return (
    <div className='text-white'>
        <div className='h-[190px] max-w-maxContent '>
            <Swiper
            // modules={[FreeMode, Pagination, Autoplay]}
            // slidesPerView={4}
            // spaceBetween={24}
            // loop={true}
            // freeMode={true}
            // autoplay={{
            //     delay: 1200,
            // }}
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={30}
      slidesPerView={4}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}

            className='w-full'
            >

                {
                    reviews.map((review, index) => (
                        <SwiperSlide key={index} className='rounded-md bg-slate-900 p-3'>
                            <img
                            src={review?.UserId?.image
                             ? review?.UserId?.image
                              : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.UserId?.first_name}${review?.UserId?.last_name}`}
                              alt='Profile Pic'
                              className='h-9 w-9 object-cover rounded-full'
                            />
                            <p>{review?.UserId?.first_name} {review?.UserId?.last_name}</p>
                            <p>{review?.course?.courseName}</p>
                            <p>
                                {review?.review}
                            </p>
                            <p>{review?.rating.toFixed(1)}</p>
                            <ReactStars 
                                count={5}
                                value={review.rating}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<FaStar />}
                                fullIcon={<FaStar />}
                            />
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    </div>
  )
}

export default ReviewSlider