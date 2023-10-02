
const mongoose=require("mongoose");
require("dotenv").config();
const dbconnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>console.log("Db is connected"))
    .catch((error)=>{
        console.log("Issue in DB connction");
        console.error(error.message);
        process.exit(1);
    })
}

module.exports=dbconnect;