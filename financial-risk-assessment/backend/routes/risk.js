const express = require('express');
const {
  createAssessment,
  getAssessmentHistory,
  getAssessment,
  deleteAssessment
} = require('../controllers/riskController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/assess').post(createAssessment);
router.route('/history').get(getAssessmentHistory);
router.route('/:id').get(getAssessment).delete(deleteAssessment);

module.exports = router;