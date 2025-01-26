const express = require('express');
const {
    getProgress,
    updateProgress,
    getProgressByCourse,
} = require('../controllers/progressController');

const {authMiddleware} = require('../middleware/authMiddleware');
const router = require('./authRoutes');

router.get('/',authMiddleware,getProgress);
router.put('/',authMiddleware,updateProgress);
router.get('/:courseId',authMiddleware,getProgressByCourse);

module.exports = router;