const section=require("../modells/Section")
const Courses=require("../modells/Courese")
exports.createSection=async(req,res)=>{
    try{
        const {sectionName,courseId}=req.body;
        const UpdateSection=await section.create({sectionName});
        const updatedCourse = await Courses.findByIdAndUpdate(
			courseId,
			{
				$push: {
					CourseContent: UpdateSection._id,
				},
			},
			{ new: true }
		)
			.populate({
				path: "CourseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();
            return res.status(200).json({
                success:true,
                message:"section is created",
                updatedCourse
            })
    }catch(err)
    {
        return res.json({
            success:false,
            message:err.message
        })
    }
}
//update section
exports.updateSection=async(req,res)=>{
    try{
        const {sectionName,sectionId}=req.body;
        const sectionupdate=await section.findByIdAndUpdate({sectionId},{
            sectionName:sectionName
        },{new:true})
        return res.status(200).json({
            success:true,
            message:"section is updated",
            sectionupdate
        })
    }catch(err)
    {
        return res.json({
            success:false,
            message:err.message
        })
    }
}
//delete the section
exports.deleteSection=async(req,res)=>{
    try{
        const {sectionId}=req.params;
        await section.findByIdAndDelete(sectionId)
        return res.json({
            success:true,
            message:"section is deleted "
        })
    }catch(err)
    {
            return res.json({
                success:false,
                message:err.message
            })
    }
}