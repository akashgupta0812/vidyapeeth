const mongoose=require("mongoose");
const Courses=new mongoose.Schema(
    {
      
        CourseName:{
            type:String,
            required:true
        },
        CourseDescription:{
            type:String,
            required:true
        },
        Instructor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        whatwillyoulearn:{
            type:String,
            required:true
        },
        CourseContent:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }],
        ratingandreview:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }],
        price:{
            type:Number,
            required:true
        },
        thumbnail:{
            type:String,
            required:true
        },
        tag: {
		type: [String],
		required: true,
	},
      category: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
		ref: "Category",
	},
        Student:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        StudentEnrolled:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }],
        status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    	createdAt: {
		type:Date,
		default:Date.now
	},
    }
    
)
module.exports=mongoose.model("Courses",Courses);
