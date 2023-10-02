//ResetPaaswordToken
const User=require("../modells/User")
const mailSender=require("../utilis/mailSender")
const bcrypt=require("bcrypt")
const crypto = require("crypto");
exports.resetPasswordToken=async(req,res)=>{
    //fetch email from req ki body
    //validate email
    //create token

    //create frotend link for user to change his/her passsword //create url for froend
    //send email to user email id to access the frotend ui
    //store this token to user db in order to retrieve it later
    try{
        const {email}=req.body;
        // console.log("email in  backend",email);
        const UserDetails=await User.findOne({email}) 
          //({email}) is also syntax
        //   console.log("User details ",UserDetails);
        if(!UserDetails)
        {
            return res.status(403).json({
                success:false,
                message:"USER DOES NOT EXIT"
            })
        }
        // const token=self.crypto.randomUUID();
        const token = crypto.randomBytes(20).toString("hex");
        const details=await User.findOneAndUpdate({email},{
            token:token,
            ResetPasswordExpires:Date.now()+5*60*1000
        },{new:true})
        // console.log("deatils  ",details);
        const url=`http://localhost:3000/change-password/${token}`
        const mailResponse= await mailSender(email,
            "Greeting from VidyaPeeth !!",
            `Visit Below link to Reset Your Paasword ${url}`)
      

        return res.status(200).json({
            success:true,
            message:"Email is sent successfully",
            details,
            mailResponse
        })

    }
    catch(err)
    {
        return res.status(401).json({
            success:false,
            message:err.message
        })
    }
}
//ResetPassword
exports.resetPassword=async(req,res)=>{
    try{
    const {newpassword,confirmpassword,token}=req.body;
    // console.log("incoming token ",token);
    if(!token)
    {
        return res.json({
            success:false,
            message:"token is null"
        })
    }
    if(newpassword!==confirmpassword)
    {
        return res.json({
            success:false,
            message:"Password and confirmpassword is not matched "
        })
    }
    const details=await User.findOne({token:token})
    if(!details)
    {
        return res.json({
            success:false,
            message:"token does not exit for this user"
        })
    }
    // console.log("details otken          ",details ,details.token, token );
    if(token!==details.token)
    {
        return res.json({
            success:false,
            message:"token does not matched"
        })
    }
    if(details.ResetPasswordExpires < Date.now())
    {
        return res.status(400).json({
            success:false,
            message:"token is expired ,please try again "
        })
    }
    //means password and confirmedpassword is same
    let hashpassword;
    
    try{
        hashpassword=await bcrypt.hash(newpassword,10);
    }
    catch(err)
    {
        return res.status(401).json({
            success:false,
            message:err.message
        })
    }
    const updateDetail=await User.findOneAndUpdate(
        {token:token},
        {password:hashpassword},
        {
            new:true
        }
    )
    return res.json({
        success:true,
        message:"password is changed successfully",
        updateDetail
    })




    }catch(err)
    {
        return res.status(403).json({
            success:false,
            message:err.message
        })
    }
}





