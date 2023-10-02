const mongoose=require("mongoose");
const RatingAndReview=new mongoose.Schema(
    {
        UserId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        rating:{
            type:Number
        },
        review:{
            type:String,
            required:true
        }
        ,
        courseid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Courses"

        }

    }
    
)
module.exports=mongoose.model("RatingAndReview",RatingAndReview);
