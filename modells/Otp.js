const mongoose=require("mongoose");
const mailSender = require("../utilis/mailSender");
const otpTemplate=require("../mail/template/emailVerificationTemplate")
const OTP=new mongoose.Schema(
    {
       email:{
        type:String,
        required:true
       },
       otp:{
        type:String
       },
       CreatedAt:{
        type:Date,
        default:Date.now,
        expires:'5m'
       }
       

    }
    
)

async function sendVerificationEmail(email,otp)
{
    try{
        const mailResponse= await mailSender(email,"verficitation code from VidyaPeeth",otpTemplate(otp))
        // console.log("email send successfully",mailResponse);
    }
    catch(err)
    {
        // console.log("error while sending email",err);
        throw err;

    }
}
OTP.pre("save",async function(next)
{ 
    
    await sendVerificationEmail(this.email,this.otp)
    next();
})
module.exports=mongoose.model("OTP",OTP);
