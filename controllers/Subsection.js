const {ImageUploader} =require("../utilis/ImageUploader")
const Section=require("../modells/Section");
const subsection=require("../modells/SubSection");
//create subsection
exports.createSubSection=async(req,res)=>{
    try{
        const {sectionId,title,description}=req.body;
        const video=req.files.video;
        // console.log(video);
        if(!title ||! description)
        {
            return res.status(400).json({
                success:false,
                message:"all fields are required"

            })
        }
        // console.log("uploadDetails");
        const uploadDetails = await ImageUploader(
            video,
            "Ak"
          )
        //   console.log(uploadDetails);
         const newsubsection=await subsection.create({
            title:title,
            timeDuration:`${uploadDetails.duration}`,
            description,
            videoUrl:uploadDetails.secure_url
        })
        const section=await Section.findByIdAndUpdate({_id:sectionId},{
            $push:{
                subSection:newsubsection._id
            }
        },{new:true}).populate("subSection")
    
        // const UpdatedCourse=await Courses.find
        return res.status(200).json({
            success:true,
            message:"sub section is created",
            section
        })


    }catch(err)
    {
        return res.json(
            {
                success:false,
                message:err.message
            }
        )
    }
}
//update subsection
exports.updateSubSection=async(req,res)=>{
    try{
        const {subsectionId,title,timeDuration,description}=req.body;
        const videourl=req.files.video;
        await subsection.findByIdAndUpdate({subsectionId},{
            
                title:title,
                timeDuration,
                description,
                videourl
            
        },{new:true})
        return res.status(200).json({
            success:true,
            message:"section is updated"
        })
    }catch(err)
    {
            
        return res.json({
            success:false,
            message:err.message
        })
    }
}
//delete subscription
exports.deleteSubSection=async(req,res)=>{
    try{
        const {subsectionId}=req.params;
        await subsection.findByIdAndDelete(subsectionId)
        return res.json({
            success:true,
            message:"subsection is deleted "
        })
    }catch(err)
    {
            return res.json({
                success:false,
                message:err.message
            })
    }
}