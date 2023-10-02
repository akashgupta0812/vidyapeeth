const RatingAndReview=require("../modells/RatingAndReview")
const Courses=require("../modells/Courese")
const User=require("../modells/User")
//createrating and review
exports.createRating=async(req,res)=>{
    //fetch review and rating-----* 
    //courseid fetch ----*
    //userid fetch ---*
    //validate user is enrolled in course or not---*
    //validate review is already given by user or not ---*
    //create review and rating ----*
    //update review in course modells as well--*

    try{
        const userid=req.user.id;
        const {rating,review,courseid}
        =req.body;
      
        if(!rating || !review)
        {
            return res.json({
                success:false,
                message:"All fields are required"
            })
        }
        if(!userid)
        {
            return res.json({
                success:false,
                message:"userid is empty"
            })
        }
        const user=await User.findById(userid)
        // console.log(user);
        if(!user)
        {
            return res.json({
                success:false,
                message:"this is not a valid user,user does not exit"
            })
        }
        //check wheather user is enrolled in course or not
        const foundObjects = await Courses.find({
            StudentEnrolled:userid, // Find objects where the reference ID is in the array
          });
         if(!foundObjects)
         {
            return res.json({
                success:false,
                message:"User is not enrolled in this course"
            })
         }
         //check wheather user already given review or not
         const checkreview=await RatingAndReview.findById({_id:userid})
         if(checkreview)
         {
            return res.json({
                 success:false,
                 message:"Review is already given"
            })
         }
         

        const resp=await RatingAndReview.create({UserId:user._id,rating,review,courseid:courseid})
        await Courses.findByIdAndUpdate(courseid,{
            $push:{
                ratingandreview:resp._id
            }
        },{new:true})
        // console.log(res);
        return res.status(200).json({
            success:true,
            message:"RATING IS CREATED SUCCESSFULLY"
           , resp
        })
    }catch(err)
    {
            return res.status(401).json({
                success:false,
                message:err.message
            })
    }
}
//getaveragerating
exports.getAverageRating=async(req, res)=>{
  try {
    const courseId = req.body.courseid // Get the courseId from the request params

    const pipeline = [
      {
        $match: {
          courseId: mongoose.Types.ObjectId(courseId), // Filter by courseId
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
        },
      },
    ];

    const result = await RatingAndReview.aggregate(pipeline);

    if (result.length > 0) {
      res.status(200).json({
        success:true,
         averageRating: result[0].averageRating 
        });
    } else {
      res.status(404).json({
        success:false,
         message: 'No reviews found for the course.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// getAllRating
exports.getAllRating=async(req,res)=>{
try{
const rating=await RatingAndReview.find({}).sort({rating:"desc"})
.populate({
    path:"UserId",
    select:"first_name last_name email image "
})
.populate({
    path:"courseid",
    select:"CourseName"
})
.exec();

return res.status(200).json({
    success:true,
    rating,
    message:" all rating  is fetched successsfully ",
    data:rating
})
}catch(err)
{
return res.status(401).json({
    success:false,
    message:err.message,
})
}
}
