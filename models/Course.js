const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
    },
    description:{
        type:String,
    },
    content:[{
        type:String
    }],
    quizzes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Quiz'
    }],
});

module.exports = mongoose.model('Course',CourseSchema);