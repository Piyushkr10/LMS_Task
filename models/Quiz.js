const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required:true,
    },
    questions:[
        {
            questionsText:{
                type:String,
            },
            options:[String],
            correctAnswer:{
                type:String
            },
        },
    ],
});

module.exports = mongoose.model('Quiz',QuizSchema);