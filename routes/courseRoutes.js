const express = require('express');
const {createCourse,getCourse} = require('../controllers/courseController');
const {authMiddleware} = require('../middleware/authMiddleware');
const {roleMiddleware} = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/',authMiddleware,roleMiddleware(['Admin']),createCourse);
router.get('/',authMiddleware,getCourse);

module.exports = router;