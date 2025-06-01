/**
 * Advanced Financial Risk Assessment Service
 * This service calculates comprehensive financial risk based on multiple factors
 */

class FinancialRiskAssessment {
  
  /**
   * Main risk assessment calculation
   * @param {Object} data - Assessment input data
   * @returns {Object} - Complete risk assessment results
   */
  static calculateRisk(data) {
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
    } = data;

    // Calculate individual risk components
    const financialStabilityScore = this.calculateFinancialStability(
      monthlyIncome, monthlyExpenses, totalSavings, totalDebt
    );
    
    const experienceScore = this.calculateExperienceScore(investmentExperience);
    const toleranceScore = this.calculateToleranceScore(riskTolerance);
    const goalScore = this.calculateGoalScore(investmentGoal, timeHorizon);
    const ageScore = this.calculateAgeScore(age);
    
    // Weighted risk calculation
    const weights = {
      financialStability: 0.35,
      experience: 0.20,
      tolerance: 0.20,
      goal: 0.15,
      age: 0.10
    };
    
    const overallRiskScore = (
      financialStabilityScore * weights.financialStability +
      experienceScore * weights.experience +
      toleranceScore * weights.tolerance +
      goalScore * weights.goal +
      ageScore * weights.age
    );
    
    // Determine risk level and percentage
    const riskLevel = this.determineRiskLevel(overallRiskScore);
    const riskPercentage = this.calculateRiskPercentage(overallRiskScore);
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(data, overallRiskScore);
    
    // Detailed analysis
    const detailedAnalysis = this.generateDetailedAnalysis(data);
    
    return {
      riskScore: Math.round(overallRiskScore),
      riskLevel,
      riskPercentage,
      recommendations,
      detailedAnalysis
    };
  }
  
  /**
   * Calculate financial stability score based on income, expenses, savings, and debt
   */
  static calculateFinancialStability(income, expenses, savings, debt) {
    const disposableIncome = income - expenses;
    const debtToIncomeRatio = debt / income;
    const savingsToIncomeRatio = savings / income;
    const expenseRatio = expenses / income;
    
    let score = 50; // Base score
    
    // Disposable income factor
    if (disposableIncome > income * 0.3) score += 20;
    else if (disposableIncome > income * 0.15) score += 10;
    else if (disposableIncome < 0) score -= 30;
    
    // Debt to income ratio factor
    if (debtToIncomeRatio > 0.5) score -= 25;
    else if (debtToIncomeRatio > 0.3) score -= 15;
    else if (debtToIncomeRatio < 0.1) score += 15;
    
    // Savings ratio factor
    if (savingsToIncomeRatio > 0.5) score += 20;
    else if (savingsToIncomeRatio > 0.2) score += 10;
    else if (savingsToIncomeRatio < 0.05) score -= 15;
    
    // Emergency fund factor (3-6 months of expenses)
    const emergencyFundRatio = savings / (expenses * 6);
    if (emergencyFundRatio >= 1) score += 15;
    else if (emergencyFundRatio >= 0.5) score += 5;
    else score -= 10;
    
    return Math.max(0, Math.min(100, score));
  }
  
  /**
   * Calculate experience-based risk score
   */
  static calculateExperienceScore(experience) {
    const experienceScores = {
      'beginner': 25,
      'intermediate': 50,
      'advanced': 75,
      'expert': 90
    };
    return experienceScores[experience] || 25;
  }
  
  /**
   * Calculate risk tolerance score
   */
  static calculateToleranceScore(tolerance) {
    const toleranceScores = {
      'conservative': 30,
      'moderate': 60,
      'aggressive': 85
    };
    return toleranceScores[tolerance] || 30;
  }
  
  /**
   * Calculate goal-based score considering time horizon
   */
  static calculateGoalScore(goal, timeHorizon) {
    const goalBaseScores = {
      'emergency_fund': 20,
      'education': 40,
      'house': 50,
      'retirement': 70,
      'business': 80,
      'wealth_building': 75
    };
    
    let score = goalBaseScores[goal] || 50;
    
    // Adjust based on time horizon
    if (timeHorizon > 10) score += 20;
    else if (timeHorizon > 5) score += 10;
    else if (timeHorizon < 2) score -= 15;
    
    return Math.max(0, Math.min(100, score));
  }
  
  /**
   * Calculate age-based risk capacity
   */
  static calculateAgeScore(age) {
    if (age < 30) return 80;
    else if (age < 40) return 70;
    else if (age < 50) return 60;
    else if (age < 60) return 45;
    else return 30;
  }
  
  /**
   * Determine risk level based on overall score
   */
  static determineRiskLevel(score) {
    if (score >= 70) return 'High';
    else if (score >= 40) return 'Medium';
    else return 'Low';
  }
  
  /**
   * Calculate risk percentage for display
   */
  static calculateRiskPercentage(score) {
    return Math.round(score);
  }
  
  /**
   * Generate personalized recommendations
   */
  static generateRecommendations(data, riskScore) {
    const recommendations = [];
    const { monthlyIncome, monthlyExpenses, totalSavings, totalDebt } = data;
    
    const debtToIncomeRatio = totalDebt / monthlyIncome;
    const emergencyFundMonths = totalSavings / monthlyExpenses;
    
    // Debt management recommendations
    if (debtToIncomeRatio > 0.3) {
      recommendations.push({
        category: 'Debt Management',
        suggestion: 'Consider debt consolidation or aggressive debt payoff strategy. Your debt-to-income ratio is above recommended levels.',
        priority: 'high'
      });
    }
    
    // Emergency fund recommendations
    if (emergencyFundMonths < 3) {
      recommendations.push({
        category: 'Emergency Fund',
        suggestion: 'Build emergency fund to cover 3-6 months of expenses before making high-risk investments.',
        priority: 'high'
      });
    }
    
    // Investment recommendations based on risk score
    if (riskScore < 40) {
      recommendations.push({
        category: 'Investment Strategy',
        suggestion: 'Focus on conservative investments like bonds, CDs, and blue-chip dividend stocks.',
        priority: 'medium'
      });
    } else if (riskScore < 70) {
      recommendations.push({
        category: 'Investment Strategy',
        suggestion: 'Consider a balanced portfolio with mix of stocks and bonds appropriate for moderate risk tolerance.',
        priority: 'medium'
      });
    } else {
      recommendations.push({
        category: 'Investment Strategy',
        suggestion: 'You can consider growth stocks and higher-risk investments, but maintain proper diversification.',
        priority: 'medium'
      });
    }
    
    // Risk management
    recommendations.push({
      category: 'Risk Management',
      suggestion: 'Ensure adequate insurance coverage and consider dollar-cost averaging for investments.',
      priority: 'low'
    });
    
    return recommendations;
  }
  
  /**
   * Generate detailed financial analysis
   */
  static generateDetailedAnalysis(data) {
    const { monthlyIncome, monthlyExpenses, totalSavings, totalDebt } = data;
    
    const debtToIncomeRatio = (totalDebt / monthlyIncome) * 100;
    const emergencyFundRatio = totalSavings / (monthlyExpenses * 6);
    const savingsRate = ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100;
    
    return {
      financialStability: {
        score: this.calculateFinancialStability(monthlyIncome, monthlyExpenses, totalSavings, totalDebt),
        description: this.getStabilityDescription(savingsRate)
      },
      debtToIncomeRatio: {
        ratio: Math.round(debtToIncomeRatio),
        assessment: this.getDebtAssessment(debtToIncomeRatio)
      },
      emergencyFundRatio: {
        ratio: Math.round(emergencyFundRatio * 100),
        assessment: this.getEmergencyFundAssessment(emergencyFundRatio)
      },
      riskCapacity: {
        score: Math.round(savingsRate),
        description: this.getRiskCapacityDescription(savingsRate)
      }
    };
  }
  
  static getStabilityDescription(savingsRate) {
    if (savingsRate > 20) return 'Excellent financial stability with strong savings capacity';
    else if (savingsRate > 10) return 'Good financial stability with moderate savings ability';
    else if (savingsRate > 0) return 'Fair financial stability but limited savings capacity';
    else return 'Poor financial stability - expenses exceed income';
  }
  
  static getDebtAssessment(ratio) {
    if (ratio < 10) return 'Excellent - Very low debt burden';
    else if (ratio < 30) return 'Good - Manageable debt levels';
    else if (ratio < 50) return 'Caution - High debt burden';
    else return 'Critical - Excessive debt levels';
  }
  
  static getEmergencyFundAssessment(ratio) {
    if (ratio >= 1) return 'Excellent - Well-prepared for emergencies';
    else if (ratio >= 0.5) return 'Good - Adequate emergency preparation';
    else if (ratio >= 0.25) return 'Fair - Basic emergency coverage';
    else return 'Poor - Insufficient emergency fund';
  }
  
  static getRiskCapacityDescription(savingsRate) {
    if (savingsRate > 20) return 'High capacity for investment risk due to strong cash flow';
    else if (savingsRate > 10) return 'Moderate capacity for investment risk';
    else if (savingsRate > 0) return 'Limited capacity for investment risk';
    else return 'No capacity for investment risk - focus on income/expense optimization';
  }
}

module.exports = FinancialRiskAssessment;