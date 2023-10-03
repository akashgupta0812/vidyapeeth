import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiConnector } from '../../services/apiconnector';
import { getCatalogaPageData } from '../../services/operations/PageAndCategory';
import { categories } from '../../services/apis';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Footer from '../../SupportComponents/Home/Footer'
import CourseSlider from './Category/CourseSlider';
import Course_Card from './Category/Course_Card';
import { useSelector } from 'react-redux';
import ReviewSlider from '../../SupportComponents/common/ReviewSlider';
const Category = () => {
    const CourseName=useParams();
    // console.log("course name ",CourseName);
    // const dispatch=useDispatch();
       const { loading } = useSelector((state) => state.profile)
    const [active, setActive] = useState(1)
    const [coursesId,setCourseId]=useState("");
    const [CatagoryPage,setCatalogPageData]=useState([]);
    // console.log("courses ",CatagoryPage);
    useEffect(()=>{
      const FetchCatalog=async()=>{
            try{
        const response=await apiConnector("GET",categories.CATEGORIES_API)
        // console.log("resp ",response.data.data);
        const courseId=response.data.data.filter((course)=>
          course.name.toLowerCase().split(' ').join("-")===CourseName.id
        )
        // console.log("xxxx",courseId[0]._id);
        // console.log("courseud ",courseId._id);
        setCourseId(courseId[0]._id)
        if(!response.data.success)
        throw new Error(response.data.message);
      // const courseid=
      }catch(err)
      {
        toast.error("unsuccessuly attempted")
      }
      }
    FetchCatalog();
    },[CourseName])
    useEffect(()=>{
         const getCategoryDetails = async() => {
            try{
                const res = await getCatalogaPageData(coursesId);
                // console.log("PRinting res: ", res);
                setCatalogPageData(res.data);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(coursesId) {
            getCategoryDetails();
        }
        
        // const CategoryPageDetail= async()=>{
        //   try{
        // const response =await PageCatory(coursesId)
        // console.log("Response ",response);
        //   }catch(err)
        //   {
        //     toast.error("ERROR IN FETCHING ")
        //   }
        // }
        // if(coursesId!="")
        // CategoryPageDetail();
    },[coursesId])
  return (
    <>
          {/* Hero Section */}
          <div className=" box-content bg-slate-800 px-4">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
              <p className="text-sm text-slate-300">
                {`Home / Catalog / `}
                <span className="text-yellow-500">
                  {CatagoryPage?.data?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-3xl text-slate-500">
                {CatagoryPage?.data?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-slate-200">
                {CatagoryPage?.data?.selectedCategory?.description}
              </p>
            </div>
          </div>
    
          {/* Section 1 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading text-slate-300">Courses to get you started</div>
            <div className="my-4 flex border-b border-b-slate-600 text-sm">
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-500 text-yellow-300"
                    : "text-slate-500"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Populer
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-500 text-yellow-300"
                    : "text-slate-500"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
            <div>
              <CourseSlider
                Courses={CatagoryPage?.data?.selectedCategory?.courses}
              />
            </div>
          </div>
          {/* Section 2 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading text-slate-300">
              Top courses in {CatagoryPage?.data?.differentCategory?.name}
            </div>
            <div className="py-8">
              <CourseSlider
                Courses={CatagoryPage?.data?.differentCategory?.courses}
              />
            </div>
          </div>
    
          {/* Section 3 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Frequently Bought</div>
            <div className="py-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {CatagoryPage?.data?.mostSellingCourses
                  ?.slice(0, 4)
                  .map((course, i) => (
                    <Course_Card course={course} key={i} Height={"h-[400px]"} />
                  ))}
              </div>
            </div>
          </div>
         <div className='m-3'>
           <h1  className='text-3xl text-white text-center'>Review From Learners</h1> 
      <ReviewSlider/>
        </div>
          <Footer />
        </>
  )
}

export default Category
