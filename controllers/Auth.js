const Otp=require("../modells/Otp")
const otpGenerator=require('otp-generator')
const User=require("../modells/User")
const bcrypt=require("bcrypt")
const Profile=require("../modells/Profile")
const jwt=require("jsonwebtoken")
const mailSender=require("../utilis/mailSender")
const {passwordUpdated} =require("../mail/template/passwordUpdate")
//SendOTP
exports.SendOtp= async (req,res)=>{
try{
//fetch email from req ki body
const {email}=req.body;
// console.log("email is ",email);
//check if email is exit or not  in user database
const useremail= await User.findOne({email})
// if exit return response entited as user already exit
if(useremail)
{
   return  res.status(500).json({
        success:false,
        message:"User already exit"
    })
}
//if useremail has no valid response means user does not exit  in that situation you sennd otp tp new user to veriify the user emal to verfiy the emial prior to save in databse
const newotp=otpGenerator.generate(6,{
    upperCaseAlphabets:false,
    lowerCaseAlphabets:false,
    specialChars:false
})
//check otp is unique or not if otp is not unique then it will create the problem and create th eotp again agian till it is unique
// console.log("generated otp is ",newotp);
const votp=await Otp.findOne({otp:newotp})
// console.log("votp for the first time ",votp);

//if otp exit create new otp
if(votp)
{
    while(votp)
    {
        const newotp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })
         votp=await Otp.findOne({otp:newotp})
    
    }
    newotp=votp;
    
}


//now we get the unique otp store this otp to databse in order to verify the user 
const OTPpayload={email,newotp}
// console.log("otp payload is ",OTPpayload);
const otpnew=await Otp.create({
    email:OTPpayload.email,
    otp:OTPpayload.newotp
})
// console.log("ot  p   is am here  ",otpnew);
// console.log("new otp created checked here",otpnew);
res.status(200).json({
    success:true,
    message:"otp created successfuly",
    otpnew,
    
})
}catch(err)
{
res.status(400).json({
    success:false,
    message:err.message
})
}
}
//Login
exports.Login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        // console.log("tag naem ",tag,name);
        const checkEmail=await User.findOne({email}).populate("additionalDetails");
        // console.log("checmial ",checkEmail );
        //check wheather user exit on not
        if(!checkEmail)
        { 
            // console.log("aya aaya hu bhai");
            return res.status(401).send({
                success:false,
                message:`User does not exit please Signup First!!`
            })
        }
        const payload={
            email:checkEmail.email,
            id:checkEmail.id,
            accountType:checkEmail.accountType

        }
        const option={
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true
        }
        //compare password if user exit
        if( await bcrypt.compare(password,checkEmail.password))
        {
          const token=jwt.sign(payload,"Akash",{
            expiresIn:"2hr"
          })
        //   checkEmail=checkEmail.toObject();

          checkEmail.token=token;
          // exisiting.name="kkdpowpojdwopjfoew";
          // exisiting.email="ojipjpijdpiswjdpwj@gmail.com"
          checkEmail.password=undefined;
          // console.log(exisiting);
          res.cookie("token",token,option).status(200).json(
              {
                  success:true,
                  token:token,
                  checkEmail,
                  message:"login sucessfully"
                
              }
          )
        }
        else 
        {
            return res.status(400).json({
                success:false,
                message:"Password does not  matched !please try again ..."
            })
        }


    }catch(err)
    {
        return res.status(401).json({
            success:false,
            message:err.message,
            
        })
    }
}

//Signup
exports.Signup=async(req,res)=>{
    try{
        //fetch email to 
        const { accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            }=req.body;
            // console.log("otp   ",otp);
        if(!email || !password|| !confirmPassword ||!firstName ||!lastName)
        {
            return res.status(403).json({
                success:false,
                message:"All field are required"
            })
        }
        if(password!=confirmPassword)
        {
            return res.status(400).json({
                success:true,
                message:"password and conformPassword is not matched"
            })
        }
        //check wheather email exit or not
        const response=await User.findOne({email});
        // console.log("checking whewther user exit or not ",response);
        //response is valid then usewr exit
        if(response)
        {
           return res.status(400).json({
                success:false,
                message:"User already exit"
            })
        }
        const otpvalidate=await Otp.findOne({email}).sort({CreatedAt:-1}).limit(-1)
    //    console.log("hey yha tak aaya hu ");
    //    console.log("otpvalidate  ",otpvalidate);

       
         if(!otpvalidate)
        {
            return res.status(403).json({
                success:false,
                message:"OTP not found"
            })
        }
        if(otpvalidate.otp!=otp)
        {    
            // console.log("otpvalidate *********************** ",otpvalidate);
            // console.log("otp ",otpvalidate.otp);
            // console.log("email is ",otpvalidate.email);
            // console.log(otp);
            return res.status(401).json({
                success:false,
                otpvalidate,
                message:"Opt does not matched"
            })
        }

        //means password and confirmedpassword is same
        let hashpassword;
        let hashconfirmpassword;
        try{
            hashpassword=await bcrypt.hash(password,10);
            hashconfirmpassword=await bcrypt.hash(confirmPassword,10);
        }
        catch(err)
        {
            return res.status(401).json({
                success:false,
                message:err.mess
            })
        }
        const profile=await Profile.create({gender:null,DateOfBirth:null,about:null,
        phone:null})
        //now create new entry in database for the user
        const NewUser=await User.create({
            first_name:firstName,
            last_name:lastName,
            email,
            password:hashpassword,
            confirmPassword:hashconfirmpassword,
            accountType:accountType,
            additionalDetails:profile._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`})
        // console.log("new user is ",NewUser);
        //new user is created 
        return res.status(200).json({
            success:true,
            message:"Congratualtion! welcome to VidyaPeeth",
            NewUser
        })

    }
    catch(err)
    {
        res.status(401).json({
            success:false,
            message:err.message
            ,
        })
    }
}


//changePassword
exports.changePassword=async(req,res)=>{
    //fetch required data from req ki body
    // oldpassword newpasssword confirmpassword
    // validate newpassword
    // update password in DB
    // send mail regarding this
    // return response
    try{
        // fetch data from req ki body
        const UserId=req.user.id
        const email=req.user.email
        const {oldPassword,newPassword}=req.body;
        const validate=await User.findById(UserId)
        if(!validate)
        {
          return res.status(401).json({
            success:false,
            message:"Email does not exit"
          })  
        }
        // console.log(validate);
        // if(newPassword!=confirmPassword)
        // {
        //     return res.status(401).json({
        //         success:false,
        //         message:"Password and confirmPasswor does not matched"
        //     })
        // }
     
        if(await bcrypt.compare(oldPassword,validate.password))
        { 
            let hashpassword;
            try{
                hashpassword=await bcrypt.hash(newPassword,10);
                // hashconfirmpassword=await bcrypt.hash(confirmPassword,10);
            }
            catch(err)
            {
                return res.status(401).json({
                    success:false,
                    message:err.message
                })
            }
            const UpdateDetails=await User.findOneAndUpdate(validate,{
                password:hashpassword},{new:true})
                console.log(UpdateDetails);
                const mailResponse= await mailSender(email,"Greeting from VidyaPeeth !!",	passwordUpdated(
					UpdateDetails.email,
					`Password updated successfully for ${UpdateDetails.first_name} ${UpdateDetails.last_name}`
				))
                return res.status(200).json({
                    success:true,
                    message:"password is changed",
                    mailResponse
                })
        }
        else
        {
            return res.status(403).json({
                success:false,
                message:"Password is not matched"
            })
        }

       



    }catch(err)
    {
        return res.status(403).json({
            success:false,
            message:err.message
        })
    }

}