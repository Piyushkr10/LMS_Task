const Course = require('../models/Course');

exports.createCourse = async (req,res) =>{
    try{
       const {title,description,content} = req.body;
       const course = await Course.create({title,description,content});
       res.status(201).json(course);
    } catch(err){
        res.status(500).json({
            message:'Error creating course',
            error:err.message
        });
    }
};

exports.getCourses = async (req,res) =>{
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({
            message:'Error fetching course',
            error:err.message
        });
    }
};