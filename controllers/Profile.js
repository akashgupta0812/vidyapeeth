const Profile=require("../modells/Profile")
const User=require("../modells/User")
const Course=require("../modells/Courese")
const {convertSecondsToDuration} =require("../utilis/secToDuration")
const courseProgress=require("../modells/CourseProgress")
const {ImageUploader}=require("../utilis/ImageUploader")
exports.updateProfile=async(req,res)=>{
    try{
            const {dateOfBirth="",gender="",about,contactNumber}=req.body;
            const userid=req.user.id;
            if(!about || ! contactNumber)
            {
                return res.json({
                    success:false,
                    message:"All Fields are required"
                })
            }
            const UpdateProfile=await User.findById(userid);
            console.log("ans",UpdateProfile);
            const profile=UpdateProfile.additionalDetails;
            console.log("profile",profile);
            const profile1=await Profile.findById(profile);
            console.log(profile1);
            const Update=await Profile.findByIdAndUpdate(profile1._id, {DateOfBirth:dateOfBirth,gender:gender,about:about,phone:contactNumber},{new:true})
            const UpdateUser=await User.findById(userid).populate("additionalDetails")
            return res.status(200).json({
                success:true,
                message:"Profile is Updated",
                Update,UpdateProfile,
                UpdateUser
            })        
    }catch(err)
    {
        return res.json({
            success:false,
            message:err.message
        })
    }
}
//delete Account 
exports.deleteAccount=async(req,res)=>{
    try{
        // const {userid}=req.user.id;

        const userid=req.user.id
        if(!userid)
        {
            return res.json({
                success:false,
                message:"User id does not exit",
                message:"here is problem 1"
            })
        } 
        console.log(userid);
        //verify the user fromt the db
        const result=await User.findById(userid)
        console.log("user ",result);
        if(!result)
        {
            return res.json({
                success:false,
                message:"this is not a valid user ",
                // message:"problem 2"
            })
        }
        //delete profile of user
        const profileid=result.additionalDetails;
        await Profile.findByIdAndDelete(profileid)
        const coursesid=result.courses
        if(coursesid.length==0)
        {
            await User.findByIdAndDelete(userid)
            return res.json({
                success:true,
                message:"Account is deleletd"
            })
        }
        //if not means student is assossicated with some courses

        //


    }
    catch(err)
    {
        return res.status(403).json({
            success:false,
            message:err.message,
            message:"promb last",
            
        })
    }
}

//getAllUserDeatils
exports.getAllUserDeatils=async(req,res)=>{
    try{
        //fetch userid
        const user_id=req.user.id;
        const UserDetails=await User.findById({user_id}).populate("additionalDetails").populate({
            path:"Courses",
        select:"CourseName  CourseDescription Instructor ratingandreview"}).
        exec()
        if(!UserDetails)
        {
            return res.json({
                success:false,
                message:"User is Not valid"
            })
        }
        return res.json({
            success:true,
            message:"User details is fetched successfully"
        })

    }catch(err)
    {
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
//updateDisplayPictures
exports.updateDisplayPictures=async(req,res)=>{
    try{
        const id=req.user.id;
        // const {image}=req.files.file
        // console.log("here  you are");
        const image = req.files.image
        const img= await ImageUploader(image,"AKASH",1000,1000)
        // console.log(img);
        const UpdatedProfile=await User.findByIdAndUpdate(id,
            {
                image:img.secure_url
            },{new:true})
            return res.status(200).json({
                success:true,
                message:"DisplayProfile is updated successfully",
                UpdatedProfile
            })
    }catch(err)
    {
        return res.json({
            success:false,
            message:err.message
        })
    }
}
//getEnrolledCourses
exports.getEnrolledCourses = async (req, res) => {
	try {
	  const userId = req.user.id
    // console.log("i am here" ,userId);
	  let userDetails = await User.findOne({
		_id: userId,
	  })
		.populate({
		  path: "courses",
		  populate: {
			path: "CourseContent",
			populate: {
			  path: "subSection",
			},
		  },
		})
		.exec()

	  userDetails = userDetails.toObject()
	  var SubsectionLength = 0
	  for (var i = 0; i < userDetails.courses.length; i++) {
		let totalDurationInSeconds = 0
		SubsectionLength = 0
		for (var j = 0; j < userDetails.courses[i].CourseContent.length; j++) {
		  totalDurationInSeconds += userDetails.courses[i].CourseContent[
			j
		  ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
		  userDetails.courses[i].totalDuration = convertSecondsToDuration(
			totalDurationInSeconds
		  )
		  SubsectionLength +=
			userDetails.courses[i].CourseContent[j].subSection.length
		}
		let courseProgressCount = await courseProgress.findOne({
		  courseID: userDetails.courses[i]._id,
		  userId: userId,
		})
		courseProgressCount = courseProgressCount?.completedVideos.length
		if (SubsectionLength === 0) {
		  userDetails.courses[i].progressPercentage = 100
		} else {
		  // To make it up to 2 decimal point
		  const multiplier = Math.pow(10, 2)
		  userDetails.courses[i].progressPercentage =
			Math.round(
			  (courseProgressCount / SubsectionLength) * 100 * multiplier
			) / multiplier
		}
	  }
  
	  if (!userDetails) {
		return res.status(400).json({
		  success: false,
		  message: `Could not find user with id: ${userDetails}`,
		})
	  }
	  return res.status(200).json({
		success: true,
		data: userDetails.courses,
	  })
	} catch (error) {
	  return res.status(500).json({
		success: false,
		message: error.message,
	  })
	}
  }
// instrcutorDashbard
exports.instructorDashboard = async(req, res) => {
	try{
		const courseDetails = await Course.find({Instructor:req.user.id});

		const courseData  = courseDetails.map((course)=> {
			const totalStudentsEnrolled = course.StudentEnrolled.length
			const totalAmountGenerated = totalStudentsEnrolled * course.price

			//create an new object with the additional fields
			const courseDataWithStats = {
				_id: course._id,
				courseName: course.CourseName,
				courseDescription: course.CourseDescription,
				totalStudentsEnrolled,
				totalAmountGenerated,
			}
			return courseDataWithStats
		})

		res.status(200).json({courses:courseData});

	}
	catch(error) {
		console.error(error);
		res.status(500).json({message:"Internal Server Error"});
	}
}