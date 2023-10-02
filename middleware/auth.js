//Admin
const jwt=require("jsonwebtoken")
exports.auth=async (req,res,next)=>{
try{
    // console.log("header contain  ",req.header("Authorization"));
    // console.log("before auth");
    //   console.log("name is ",name);
          const token=req.body.token||req.cookies.token||req.header("Authorization").replace("Bearer ","");
// req.header("Authorization").replace("Bearer ", "");
// console.log("after  auth autho");
// console.log("token  email tag ",token);
if(!token)
{
    return res.json({
        success:false,
        message:"does not verify"
    })
}
try{
    const decode= jwt.verify(token,"Akash")
    // console.log(decode);
    req.user=decode;
}
catch(err)
{
    return res.json({
        success:false,
        message:err.message
    })
}
next();
}catch(err)
{
return res.status(400).json({
    success:false,
    message:err.message
})
}
}



//Student
exports.isStudent=async(req,res,next)=>{
    try{
        if(req.user.accountType!=="Student")
        {
            return res.status(403).json({
                success:false,
                message:"This is protected route u are trying to reach proteced routes for student"
            })
        }
        next();
    }catch(err)
    {
        return res.json({
            success:false,
            message:err.message
        })
    }
}



//Instructor
exports.isInstructor=async(req,res,next)=>{
    try{
        if(req.user.accountType!=="Instructor")
        {
            return res.status(403).json({
                success:false,
                message:"This is protected route ,u are trying to reach proteced routes for instructor"
            })
        }
        next();
    }catch(err)
    {
        return res.json({
            success:false,
            message:err.message
        })
    }
}
//Admin
exports.isAdmin=async(req,res,next)=>{
    try{
        if(req.user.accountType!=="Admin")
        {
            return res.status(403).json({
                success:false,
                message:"This is protected route ,u are trying to reach proteced routes for Admin"
            })
        }
        next();
    }catch(err)
    {
        return res.json({
            success:false,
            message:err.message
        })
    }
}
//ForgetPassword
//fetch email
//verify email
//send email
//otp
//

