const RiskAssessment = require('../models/RiskAssessment');
const FinancialRiskAssessment = require('../services/riskPrediction');

// @desc    Create new risk assessment
// @route   POST /api/risk/assess
// @access  Private
exports.createAssessment = async (req, res, next) => {
  try {
    const {
      monthlyIncome,
      monthlyExpenses,
      totalSavings,
      totalDebt,
      investmentExperience,
      riskTolerance,
      investmentGoal,
      timeHorizon,
      age
    } = req.body;

    // Validate required fields
    if (!monthlyIncome || !monthlyExpenses || totalSavings === undefined || 
        totalDebt === undefined || !investmentExperience || !riskTolerance || 
        !investmentGoal || !timeHorizon || !age) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required assessment data'
      });
    }

    // Validate numeric values
    if (monthlyIncome <= 0 || monthlyExpenses < 0 || totalSavings < 0 || 
        totalDebt < 0 || timeHorizon <= 0 || age < 18) {
      return res.status(400).json({
        success: false,
        error: 'Please provide valid numeric values'
      });
    }

    // Calculate risk assessment
    const assessmentData = {
      monthlyIncome,
      monthlyExpenses,
      totalSavings,
      totalDebt,
      investmentExperience,
      riskTolerance,  
      investmentGoal,
      timeHorizon,
      age
    };

    const riskResults = FinancialRiskAssessment.calculateRisk(assessmentData);

    // Create assessment record
    const assessment = await RiskAssessment.create({
      user: req.user._id,
      assessmentData,
      riskScore: riskResults.riskScore,
      riskLevel: riskResults.riskLevel,
      riskPercentage: riskResults.riskPercentage,
      recommendations: riskResults.recommendations,
      detailedAnalysis: riskResults.detailedAnalysis
    });

    res.status(201).json({
      success: true,
      data: assessment
    });

  } catch (error) {
    console.error('Risk assessment error:', error);
    next(error);
  }
};

// @desc    Get user's risk assessments
// @route   GET /api/risk/history
// @access  Private
exports.getAssessmentHistory = async (req, res, next) => {
  try {
    const assessments = await RiskAssessment.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      count: assessments.length,
      data: assessments
    });

  } catch (error) {
    console.error('Get assessment history error:', error);
    next(error);
  }
};

// @desc    Get specific risk assessment
// @route   GET /api/risk/:id
// @access  Private
exports.getAssessment = async (req, res, next) => {
  try {
    const assessment = await RiskAssessment.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!assessment) {
      return res.status(404).json({
        success: false,
        error: 'Assessment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: assessment
    });

  } catch (error) {
    console.error('Get assessment error:', error);
    next(error);
  }
};

// @desc    Delete risk assessment
// @route   DELETE /api/risk/:id
// @access  Private
exports.deleteAssessment = async (req, res, next) => {
  try {
    const assessment = await RiskAssessment.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!assessment) {
      return res.status(404).json({
        success: false,
        error: 'Assessment not found'
      });
    }

    await assessment.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Assessment deleted successfully'
    });

  } catch (error) {
    console.error('Delete assessment error:', error);
    next(error);
  }
};