const User=require("../modells/User");
const Section=require("../modells/Section")
const subsection=require("../modells/SubSection");
// const Tag=require("../modells/Tags");
const Category=require("../modells/Tags")
const {ImageUploader}=require("../utilis/ImageUploader");
const Courese = require("../modells/Courese");
const { convertSecondsToDuration } = require("../utilis/secToDuration")
const courseProgress=require("../modells/CourseProgress")
exports.createCourse=async(req,res)=>{
    try{
         const {
          courseName,
          courseDescription,
          whatYouWillLearn,
            price,
            tag,
            category
         }=req.body
        //  console.log("printing  ",category);
         const thumbail=req.files.thumbnailImage;
         //validate
         if(!courseName||!courseDescription||!whatYouWillLearn||!price||!tag)
         {
            return res.json({
                success:false,
                message:"all fields are required"
            })
         }
         //instructor id is to be fetch for processing
         const UserId=req.user.id
         const InstrcutorId=await User.findById(UserId);
        //  console.log(InstrcutorId);
         if(!InstrcutorId)
         {
            return res.json({
                success:false,
                message:"Something went Wrong"
            })
         }
         //validate tag 
        //  const TagDetails=await Tag.findById(tag)
        //  if(!TagDetails)
        //  {
        //     return res.json({
        //         success:false,
        //         message:"Tag Not found "
        //     })
        //  }
         //upload image to cloudinary 
        //  const tagid=await Category.findOne({tag});
        const img= await ImageUploader(thumbail,"Akash",1000,1000)
        //create new course
        const newcourse=await Courese.create(
            {
              CourseName:courseName,
              CourseDescription:courseDescription,
                Instructor:InstrcutorId._id,
                price:price,
                whatwillyoulearn:whatYouWillLearn,
                tag:tag,
                // tag:tagid._id,
                category:category,
                thumbnail:img.secure_url
            }
        )
        await User.findByIdAndUpdate({
            _id:InstrcutorId._id
        },{$push :{
            Courses:newcourse._id
        }},{new:true})
        //update tag
        // const UpdateTag=await Category.findByIdAndUpdate({_id:TagDetails.id}
        //     ,{$push:{
        //         Course:newcourse._id
        //     }},{new:true})     
        const UpdatedCategory=await Category.findByIdAndUpdate({_id:category},{
        $push:{
          courses:newcourse._id
        }
        },{new:true})  
            return res.json({
                success:true,
                message:"course created successfully",
                data:newcourse,
                UpdatedCategory
            })



    }
    catch(err)
    {
        return res.json({
            success:false,
            message:err.message
        })
    }
}
//getall all course
exports.getAllCourses=async(req,res)=>{
    try{
        const getallcourse=await Courese.find({}).populate("Instructor").exec()
        return res.status(200).json({
            success:true,
            message:"all course is fetched",
            data:getallcourse
        })
    }catch(err)
    {
        return  res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
// getCourseDetails //write by u
exports.getCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      // console.log("id   ",courseId);
      const courseDetails = await Courese.findOne({
        _id: courseId,
      })
        .populate({
          path: "Instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingandreview")
        .populate({
          path: "CourseContent",
          populate: {
            path: "subSection",
            select: "title",
          },
        })
        .exec()
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      let totalDurationInSeconds = 0
      courseDetails.CourseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
//   getFullCourseDetails,
exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      
      const userId = req.user.id
      const courseDetails = await Courese.findOne({
        _id: courseId,
      })
        .populate({
          path: "Instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingandreview")
        .populate({
          path: "CourseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      let courseProgressCount = await courseProgress.findOne({
        courseID: courseId,
        userId: userId,
      })
  
      // console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      let totalDurationInSeconds = 0
      courseDetails.CourseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
//   editCourse,
exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      const course = await Courese.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          "Ak"
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "Instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Courese.findOne({
        _id: courseId,
      })
        .populate({
          path: "Instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("tag")
        .populate("ratingandreview")
        .populate({
          path: "CourseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
        
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }
//   getInstructorCourses,
exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
      // console.log("instructorId ",instructorId);
  
      // Find all courses belonging to the instructor
      const instructorCourses = await Courese.find({
        Instructor: instructorId,
      })
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }
//   deleteCourse,
exports.deleteCourse = async (req, res) => {
    try { 
      // console.log("before course id");
      const {courseId }= req.body
    
      // console.log("course id ",courseId);
  
      // Find the course
      const course = await Courese.findById(courseId)
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
      // Unenroll students from the course
      
      const studentsEnrolled = course.StudentEnrolled
      // console.log("student ",studentsEnrolled);
      for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { courses: courseId },
        })
      }
  
      // Delete sections and sub-sections
      const courseSections = course.CourseContent
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
          const subSections = section.subSection
          for (const subSectionId of subSections) {
            await subsection.findByIdAndDelete(subSectionId)
          }
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }
  
      // Delete the course
      await Courese.findByIdAndDelete(courseId)
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }