const { default: mongoose } = require("mongoose");
const {instance}=require("../config/Razorpay")
const Course=require("../modells/Courese");
const User=require("../modells/User")
const mailSender=require("../utilis/mailSender")
const CourseProgress=require("../modells/CourseProgress")
const {courseEnrollmentEmail} = require("../mail/template/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/template/paymentSuccessEmail");
const crypto = require("crypto");
exports.capturePayment = async(req, res) => {

    const {courses} = req.body;
    const userId = req.user.id;
    console.log("courses  type ", typeof(courses)   , courses);
    console.log("type of uswrid si   userid ",typeof(userId),   userId);

    if(courses.length === 0) {
        return res.json({success:false, message:"Please provide Course Id"});
    }

    let totalAmount = 0;

    for(const course_id of courses) {
        let course;
        try{
           
            course = await Course.findById(course_id);
            if(!course) {
                return res.status(200).json({success:false, message:"Could not find the course"});
            }

            const uid  = new mongoose.Types.ObjectId(userId);
            // console.log("uid printing   type  ", uid ,typeof(uid));
            if(course.StudentEnrolled.includes(uid)) {
                return res.status(200).json({success:false, message:"Student is already Enrolled"});
            }

            totalAmount += course.price;
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }
    const currency = "INR";
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
    }
     try{
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success:true,
            message:paymentResponse,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({success:false, mesage:"Could not Initiate Order"});
    }

}
// exports.capturePayment=async(req,res)=>{
//     try{
//             const {courseid}=req.body;
//             const userid=req.user.id;
//             if(!courseid)
//             {
//                 return res.json({
//                     success:false,
//                     message:"course id is required",
//                 })
//             }
//             const user=await User.findById(userid)
//             if(!user)
//             {
//                 return res.json({
//                     success:false,
//                     message:"user is not verified"
//                 })
//             }
//             //verify that course id is valid or not 
//             const course=await Course.findById(courseid)
//             if(!course)
//             {
//                 return res.json({
//                     success:false,
//                     message:"course is not valid please verigy the course id first"
//                 })
//             }
//             //check user is already enrolled is this course or not
//             const id=new mongoose.Types.ObjectId(userid)
//             if(course.StudentEnrolled.includes(id))
//             {
//                return res.json({
//                 success:false,
//                 message:"You are already enrolled in this program"
//                }) 
//             }
//             const amount=course.price
//             const currency="INR"
//             const option={
//                 amount:amount*100,
//                 currency,
//                 notes:{
//                     user_id:userid,
//                     course_id:courseid
//                 },
//                 receipt:Math.random(Date.now()).toString(),
//             }
//             try{

//                 const PaymentResponse= await  instance.orders.create(
//                       option,
                      
//                       )
//                       return res.json({
//                         success:true,
//                         message:"Paymet is captured",
//                         coursename:course.CourseName,
//                         courseDes:course.CourseDescription,
//                         price:course.price,
//                         order_id:PaymentResponse.id,
//                         currency:PaymentResponse.currency,


//                       })
//             }
//             catch(err)
//             {
//                 return res.json({
//                     success:false,
//                     message:err.message
//                 })
//             }
                


//     }catch(err)
//     {
//             return res.status(500).json({
//                 success:false,
//                 message:"captuirng is failed"
//             })
//     }
// }
//verify signature webhook for final time for payment
exports.verifyPayment = async(req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
            return res.status(200).json({success:false, message:"Payment Failed"});
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

        if(expectedSignature === razorpay_signature) {
            //enroll karwao student ko
            await enrollStudents(courses, userId, res);
            //return res
            return res.status(200).json({success:true, message:"Payment Verified"});
        }
        return res.status(200).json({success:"false", message:"Payment Failed"});

}
const enrollStudents = async(courses, userId, res) => {

    if(!courses || !userId) {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }

    for(const courseId of courses) {
        try{
            //find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
            {_id:courseId},
            {$push:{StudentEnrolled:userId}},
            {new:true},
        )

        if(!enrolledCourse) {
            return res.status(500).json({success:false,message:"Course not Found"});
        }

        const courseProgress = await CourseProgress.create({
            courseID:courseId,
            userId:userId,
            completedVideos: [],
        })

        //find the student and add the course to their list of enrolledCOurses
        const enrolledStudent = await User.findByIdAndUpdate(userId,
            {$push:{
                courses: courseId,
                courseProgress: courseProgress._id,
            }},{new:true})
            console.log("ernorllrd  ",enrolledStudent);
        ///bachhe ko mail send kardo
        const emailResponse = await mailSender(
            enrolledStudent.email,
            `Successfully Enrolled into ${enrolledCourse.CourseName}`,
            courseEnrollmentEmail(enrolledCourse.CourseName, `${enrolledStudent.first_name}`)
        )    
        //console.log("Email Sent Successfully", emailResponse.response);
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }

}


//sendPaymentSuccessEmail
exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try{
        //student ko dhundo
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
             paymentSuccessEmail(`${enrolledStudent.first_name}`,
             amount/100,orderId, paymentId)
        )
    }
    catch(error) {
        // console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}