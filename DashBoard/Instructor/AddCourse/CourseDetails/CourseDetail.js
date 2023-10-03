import React from 'react'
import {useForm} from 'react-hook-form'
const CourseDetail = () => {
    const {
        register,
        setValue,
        getvalue,
        handleSubmit,
        formState:{errors},

    }=useForm();
    const submit=async (e)=>{
        // e.preventDefault();
        console.log("hiii");
    }
  return (
    <form onSubmit={handleSubmit(submit)} className='bg-slate-800 rounded-md border-dashed border-2 border-slate-500'>
        <div className='flex flex-col gap-3  p-2 text-slate-300'>
        <label htmlFor='CourseTitle'  className=''>Course Title <sup className='text-red-600'>*</sup></label>
        <input className='p-2 text-black text-xl rounded-md  border-none '
        id="CourseTitle"
        type='text'
        placeholder='Enter Course Name'
        {...register("CourseTitle",{required:true})}

        />
        {
            errors.CourseTitle && <span className='text-yellow-500'>Course Title is Required</span>
        }
        </div>
        <div className='flex flex-col gap-3  p-2 text-slate-300'>
        <label htmlFor='CourseDescription'  className=''>Course Description <sup className='text-red-600'>*</sup></label>
        <textarea className='p-2 text-black text-xl rounded-md  border-none min-h-[140px] '
        id="CourseDescription"
        
        placeholder='Enter Course Description'
        {...register("CourseDescription",{required:true})}

        />
        {
            errors.CourseDescription && <span className='text-yellow-500'>Course Description is Required</span>
        }
        </div>
      
    </form>
  )
}

export default CourseDetail
