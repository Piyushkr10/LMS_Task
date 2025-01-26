const Quiz = require('../models/Quiz');

exports.createQuiz = async (req,res) =>{
    try{
        const {courseId, questions} = req.body;
        const quiz = await Quiz.create({courseId, questions});
        res.status(201).json({
            message:'Quiz created',
            quiz
        });
    }catch(err){
       res.status(500).json({
        message:'Error creating quiz',
        error:err.message
       });
    }
};

exports.getQuizByCourse = async (req,res) =>{
    try{
        const {courseId} = req.params;
        const quiz = await Quiz.findOne({courseId});

        if(!quiz) return res.status(404).json({
            message:'Quiz not found'
        });
        res.status(200).json(quiz);
    } catch(err){
        res.status(500).json({
            message:'Error fetching quiz',
            error:err.message
        });
    }
};

exports.submitQuiz = async (req,res) =>{
    try{
        const {quizId,answers} = req.body;

        const quiz = await Quiz.findById(quizId);
        if(!quiz) return res.status(404).json({
            message:'Quiz not found'
        });

        let score = 0;
        quiz.questions.forEach((question,index)=>{
            if(question.correctAnswer === answers[index]) score +=1;
        });

        const result = {
            totalQuestions:quiz.questions.length,
            correctAnswer: score,
            score:Math.round((score/quiz.questions.length)*100);
        };

        res.status(200).json({
            message:'Quiz Submitted',
            result
        });
    } catch(err){
        res.status(500).json({
            message:'Error submitting quiz',
            error:err.message
        });
        
    }
};

exports.getQuizResults = async (req, res) => {
    try {
      const { quizId } = req.params; 
  
      const results = await QuizResult.find({ quizId })
        .populate('userId', 'name email') 
        .populate('quizId', 'courseId'); 
  
      
      if (!results || results.length === 0) {
        return res.status(404).json({
                message: 'No results found for this quiz'
        });
      }

      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({
        message: 'Error fetching quiz results',
        error: err.message
     });
    }
  };
  