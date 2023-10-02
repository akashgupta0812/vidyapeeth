const express=require("express");
const app=express();//insatnt of express
require("dotenv").config();
// const BASE_URL=process.env.BASE_URL
const userRoutes=require("./routes/User")
const profileRoutes=require("./routes/Profile")
const paymentRoutes=require("./routes/Payment")
const courseRoutes=require("./routes/Course")
const contactUsRoute = require("./routes/Contact");

const cookieParser=require("cookie-parser")
const cors=require("cors")
const {CloudinaryConnect}=require("./config/Cloudinary")
const fileUpload=require("express-fileupload")

const PORT=process.env.PORT||6000;
app.use(express.json());//middleware in pace of bodyParser
app.use(cookieParser());
app.use(cors({
    origin:"*",
		credentials:true,
		
    optionSuccessStatus:200,
}))
app.use(fileUpload(
    {
        useTempFiles : true,
        tempFileDir : '/tmp/'
    }
))
CloudinaryConnect();
// const routerpath=require("./routes/Allroutes")
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.listen(PORT,()=>{
    console.log(`server is started at port ${PORT}`);
})
const dbConnect=require("./config/databse")
dbConnect();
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running"
    })
})