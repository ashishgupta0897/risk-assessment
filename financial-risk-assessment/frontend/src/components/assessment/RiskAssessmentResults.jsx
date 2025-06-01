import React from 'react';

const RiskAssessmentResults = ({ assessment, onNewAssessment }) => {
  const {
    riskScore,
    riskLevel,
    riskPercentage,
    recommendations,
    detailedAnalysis,
    createdAt
  } = assessment;

  const getRiskLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'low': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getRiskLevelDescription = (level) => {
    switch (level?.toLowerCase()) {
      case 'low':
        return 'Your financial profile indicates a conservative investment approach. Focus on capital preservation with stable, lower-risk investments such as government bonds, high-grade corporate bonds, and dividend-paying blue-chip stocks.';
      case 'medium':
        return 'Your financial profile supports a balanced investment strategy. You can pursue moderate growth opportunities while maintaining reasonable risk exposure through diversified portfolios including stocks, bonds, and alternative investments.';
      case 'high':
        return 'Your financial profile demonstrates capacity for higher-risk investments. You can pursue aggressive growth strategies including growth stocks, emerging markets, and alternative investments while maintaining proper diversification.';
      default:
        return 'Risk assessment completed successfully. Please review the detailed analysis below for personalized recommendations.';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProgressBarWidth = () => {
    return `${Math.min(riskPercentage || 0, 100)}%`;
  };

  const formatRecommendations = () => {
    if (!recommendations || recommendations.length === 0) {
      return [
        {
          category: 'Portfolio Diversification',
          suggestion: 'Diversify your investment portfolio across different asset classes to minimize risk while optimizing returns.',
          priority: 'high'
        },
        {
          category: 'Emergency Preparedness',
          suggestion: 'Maintain an emergency fund covering three to six months of living expenses in readily accessible accounts.',
          priority: 'high'
        },
        {
          category: 'Regular Portfolio Review',
          suggestion: 'Conduct quarterly reviews of your investment portfolio to ensure alignment with your financial goals and market conditions.',
          priority: 'medium'
        }
      ];
    }
    return recommendations;
  };

  const formatAnalysisValue = (analysisItem) => {
    if (!analysisItem) return 'Analysis not available';
    
    if (typeof analysisItem === 'string') {
      return analysisItem;
    }
    
    if (typeof analysisItem === 'object') {
      if (analysisItem.description) return analysisItem.description;
      if (analysisItem.assessment) return analysisItem.assessment;
      return 'Analysis completed';
    }
    
    return String(analysisItem);
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="risk-results-container">
      <div className="results-header">
        <h2>Financial Risk Assessment Results</h2>
        <p className="assessment-date">
          Assessment completed on {formatDate(createdAt || new Date())}
        </p>
      </div>

      <div className="risk-overview-card">
        <div className="risk-score-section">
          <div className="risk-score-display">
            <div 
              className="risk-score-circle"
              style={{ borderColor: getRiskLevelColor(riskLevel) }}
            >
              <span className="risk-score-number">{riskScore || 0}</span>
              <span className="risk-score-label">Risk Score</span>
            </div>
          </div>
          
          <div className="risk-level-info">
            <div className="risk-level-badge">
              <span 
                className="risk-level-indicator"
                style={{ backgroundColor: getRiskLevelColor(riskLevel) }}
              ></span>
              <span className="risk-level-text">{riskLevel || 'Moderate'} Risk Profile</span>
            </div>
            
            <div className="risk-percentage">
              <div className="percentage-bar">
                <div 
                  className="percentage-fill"
                  style={{ 
                    width: getProgressBarWidth(),
                    backgroundColor: getRiskLevelColor(riskLevel)
                  }}
                ></div>
              </div>
              <span className="percentage-text">{riskPercentage || 0}% Risk Capacity</span>
            </div>
            
            <p className="risk-description">
              {getRiskLevelDescription(riskLevel)}
            </p>
          </div>
        </div>
      </div>

      <div className="analysis-card">
        <h3>Comprehensive Financial Analysis</h3>
        <div className="analysis-grid">
          <div className="analysis-item">
            <h4>Financial Stability Assessment</h4>
            <div className="analysis-score">
              Score: {detailedAnalysis?.financialStability?.score || 'N/A'}/100
            </div>
            <p>{formatAnalysisValue(detailedAnalysis?.financialStability)}</p>
          </div>
          
          <div className="analysis-item">
            <h4>Debt-to-Income Analysis</h4>
            <div className="analysis-score">
              Ratio: {detailedAnalysis?.debtToIncomeRatio?.ratio || 'N/A'}%
            </div>
            <p>{formatAnalysisValue(detailedAnalysis?.debtToIncomeRatio)}</p>
          </div>
          
          <div className="analysis-item">
            <h4>Emergency Fund Preparedness</h4>
            <div className="analysis-score">
              Coverage: {detailedAnalysis?.emergencyFundRatio?.ratio || 'N/A'}%
            </div>
            <p>{formatAnalysisValue(detailedAnalysis?.emergencyFundRatio)}</p>
          </div>
          
          <div className="analysis-item">
            <h4>Investment Risk Capacity</h4>
            <div className="analysis-score">
              Capacity: {detailedAnalysis?.riskCapacity?.score || 'N/A'}%
            </div>
            <p>{formatAnalysisValue(detailedAnalysis?.riskCapacity)}</p>
          </div>
        </div>
      </div>

      <div className="recommendations-card">
        <h3>Personalized Investment Recommendations</h3>
        <div className="recommendations-list">
          {formatRecommendations().map((recommendation, index) => (
            <div key={index} className="recommendation-item">
              <div className="recommendation-header">
                <div className="recommendation-icon">
                  <span>💡</span>
                </div>
                <div className="recommendation-title">
                  <h4>{recommendation.category}</h4>
                  <span 
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(recommendation.priority) }}
                  >
                    {recommendation.priority?.toUpperCase() || 'MEDIUM'} PRIORITY
                  </span>
                </div>
              </div>
              <div className="recommendation-content">
                <p>{recommendation.suggestion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="key-insights-card">
        <h3>Key Financial Insights</h3>
        <div className="insights-grid">
          <div className="insight-item">
            <h4>Investment Approach</h4>
            <p>
              Based on your {riskLevel?.toLowerCase() || 'moderate'} risk profile, 
              {riskScore >= 70 
                ? ' you can pursue growth-oriented investments with proper diversification.' 
                : riskScore >= 40 
                ? ' a balanced approach combining growth and income investments is recommended.'
                : ' focus on capital preservation with conservative investment vehicles.'
              }
            </p>
          </div>
          
          <div className="insight-item">
            <h4>Portfolio Allocation Guidance</h4>
            <p>
              Consider allocating approximately{' '}
              {riskScore >= 70 
                ? '70-80% to stocks and growth investments, 20-30% to bonds and stable investments'
                : riskScore >= 40
                ? '50-60% to stocks, 40-50% to bonds and conservative investments'
                : '20-30% to stocks, 70-80% to bonds and conservative investments'
              }.
            </p>
          </div>
          
          <div className="insight-item">
            <h4>Risk Management Strategy</h4>
            <p>
              Implement dollar-cost averaging for regular investments, maintain adequate insurance coverage, 
              and review your portfolio allocation quarterly to ensure it remains aligned with your financial goals.
            </p>
          </div>
          
          <div className="insight-item">
            <h4>Next Steps</h4>
            <p>
              Schedule regular financial reviews, consider consulting with a certified financial planner, 
              and stay informed about market conditions that may affect your investment strategy.
            </p>
          </div>
        </div>
      </div>

      <div className="results-actions">
        <button className="btn-primary" onClick={onNewAssessment}>Take New Assessment</button>
      </div>
    </div>
  );
};

export default RiskAssessmentResults;