import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RiskAssessmentForm from './RiskAssessmentForm';
import RiskAssessmentResults from './RiskAssessmentResults';
// import './RiskAssessment.css';

const RiskAssessment = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('form'); // 'form' or 'results'
  const [assessmentData, setAssessmentData] = useState(null);

  const handleAssessmentComplete = (data) => {
    setAssessmentData(data);
    setCurrentStep('results');
  };

  const handleNewAssessment = () => {
    setAssessmentData(null);
    setCurrentStep('form');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="risk-assessment-page">
      <div className="assessment-header">
        <button 
          className="back-btn"
          onClick={handleBackToDashboard}
        >
          ← Back to Dashboard
        </button>
        
        {currentStep === 'form' && (
          <div className="progress-indicator">
            <div className="step active">
              <span className="step-number">1</span>
              <span className="step-label">Assessment Form</span>
            </div>
            <div className="step-divider"></div>
            <div className="step">
              <span className="step-number">2</span>
              <span className="step-label">Results</span>
            </div>
          </div>
        )}
        
        {currentStep === 'results' && (
          <div className="progress-indicator">
            <div className="step completed">
              <span className="step-number">✓</span>
              <span className="step-label">Assessment Form</span>
            </div>
            <div className="step-divider"></div>
            <div className="step active">
              <span className="step-number">2</span>
              <span className="step-label">Results</span>
            </div>
          </div>
        )}
      </div>

      <div className="assessment-content">
        {currentStep === 'form' && (
          <RiskAssessmentForm onAssessmentComplete={handleAssessmentComplete} />
        )}
        
        {currentStep === 'results' && assessmentData && (
          <RiskAssessmentResults 
            assessment={assessmentData} 
            onNewAssessment={handleNewAssessment}
          />
        )}
      </div>
    </div>
  );
};

export default RiskAssessment;