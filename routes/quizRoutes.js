const express = require('express');
const {
    createQuiz,
    getQuizByCourse,
    submitQuiz,
    getQuizResults,
} = require('../controllers/quizController');

const {authMiddleware} = require('../middleware/authMiddleware');
const {roleMiddleware} = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/',authMiddleware,roleMiddleware(['Admin']),createQuiz);
router.get('/:courseId',authMiddleware,getQuizByCourse);
router.post('/submit',authMiddleware,submitQuiz);
router.get('/:quizId/results',authMiddleware,getQuizResults);

module.exports = router;