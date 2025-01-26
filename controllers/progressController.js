const Progress = require('../models/Progress');
const Course = require('../models/Course');

exports.getProgress = async (req,res) =>{
    try {
        const {userId} = req.user;
        const progress = await Progress.find({userId}).populate('courseId','title');
        res.status(200).json(progress);
    } catch(err){
        res.status(500).json({
            message:'Error fetching progress',
            error:err.message
        });
    }
};

exports.updateProgress = async (req,res) =>{
    try{
        const {userId} = req.user;
        const {CourseId, progress} = req.body;

        let courseProgress = await Progress.findOne({userId,courseId});
        if(!courseProgress){
            courseProgress = await Progress.create({userId,courseId,progress});
        }else{
            courseProgress.progress = progress;
            await courseProgress.save();
        }
        res.status(200).json({
            message:'Progress updated',
            progress: courseProgress
        });
    } catch(err){
        res.status(500).json({
            message:'Error updating progress',
            error:err.message
        });
    }
};


exports.getProgress = async (req,res) =>{
    try{
        const {userId} = req.params;

        const progress = await Progress.find({courseId}).populate('userId','name email');
        res.status(200).json(progress);
    }catch(err){
        res.status(500).json({
            message:'Error fetching course process',
            error:err.message
        });
    };
}