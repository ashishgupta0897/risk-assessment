const mongoose = require('mongoose');

const RiskAssessmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assessmentData: {
    // Personal Financial Information
    monthlyIncome: {
      type: Number,
      required: [true, 'Monthly income is required'],
      min: [0, 'Monthly income cannot be negative']
    },
    monthlyExpenses: {
      type: Number,
      required: [true, 'Monthly expenses are required'],
      min: [0, 'Monthly expenses cannot be negative']
    },
    totalSavings: {
      type: Number,
      required: [true, 'Total savings amount is required'],
      min: [0, 'Total savings cannot be negative']
    },
    totalDebt: {
      type: Number,
      required: [true, 'Total debt amount is required'],
      min: [0, 'Total debt cannot be negative']
    },
    investmentExperience: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      required: [true, 'Investment experience level is required']
    },
    riskTolerance: {
      type: String,
      enum: ['conservative', 'moderate', 'aggressive'],
      required: [true, 'Risk tolerance level is required']
    },
    investmentGoal: {
      type: String,
      enum: ['retirement', 'education', 'house', 'business', 'wealth_building', 'emergency_fund'],
      required: [true, 'Investment goal is required']
    },
    timeHorizon: {
      type: Number,
      required: [true, 'Investment time horizon is required'],
      min: [1, 'Time horizon must be at least 1 year']
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [18, 'Age must be at least 18'],
      max: [100, 'Age must be less than 100']
    }
  },
  riskScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  riskLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  },
  riskPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  recommendations: [{
    category: {
      type: String,
      required: true
    },
    suggestion: {
      type: String,
      required: true
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      required: true
    }
  }],
  detailedAnalysis: {
    financialStability: {
      score: Number,
      description: String
    },
    debtToIncomeRatio: {
      ratio: Number,
      assessment: String
    },
    emergencyFundRatio: {
      ratio: Number,
      assessment: String
    },
    riskCapacity: {
      score: Number,
      description: String
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('RiskAssessment', RiskAssessmentSchema);