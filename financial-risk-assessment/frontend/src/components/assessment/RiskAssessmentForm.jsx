import React, { useState } from 'react';
import { createRiskAssessment } from '../../services/riskService';

const RiskAssessmentForm = ({ onAssessmentComplete }) => {
  const [formData, setFormData] = useState({
    monthlyIncome: '',
    monthlyExpenses: '',
    totalSavings: '',
    totalDebt: '',
    investmentExperience: '',
    riskTolerance: '',
    investmentGoal: '',
    timeHorizon: '',
    age: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (error) setError('');
  };

  const validateForm = () => {
    const requiredFields = [
      'monthlyIncome', 'monthlyExpenses', 'totalSavings', 'totalDebt',
      'investmentExperience', 'riskTolerance', 'investmentGoal', 
      'timeHorizon', 'age'
    ];
    
    for (let field of requiredFields) {
      if (!formData[field] || formData[field] === '') {
        setError(`Please fill in all required fields. Missing: ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    
    // Validate numeric fields
    const numericFields = ['monthlyIncome', 'monthlyExpenses', 'totalSavings', 'totalDebt', 'timeHorizon', 'age'];
    for (let field of numericFields) {
      const value = parseFloat(formData[field]);
      if (isNaN(value) || value < 0) {
        setError(`Please enter valid positive numbers for ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    
    if (parseInt(formData.age) < 18) {
      setError('Age must be at least 18 years to complete this assessment');
      return false;
    }
    
    if (parseInt(formData.timeHorizon) < 1) {
      setError('Investment time horizon must be at least 1 year');
      return false;
    }

    // Additional validation for financial sense
    const income = parseFloat(formData.monthlyIncome);
    const expenses = parseFloat(formData.monthlyExpenses);
    
    if (expenses > income * 2) {
      setError('Monthly expenses seem unusually high compared to income. Please verify your entries.');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Convert numeric fields to proper types
      const assessmentData = {
        monthlyIncome: parseFloat(formData.monthlyIncome),
        monthlyExpenses: parseFloat(formData.monthlyExpenses),
        totalSavings: parseFloat(formData.totalSavings),
        totalDebt: parseFloat(formData.totalDebt),
        investmentExperience: formData.investmentExperience,
        riskTolerance: formData.riskTolerance,
        investmentGoal: formData.investmentGoal,
        timeHorizon: parseInt(formData.timeHorizon),
        age: parseInt(formData.age)
      };
      
      const result = await createRiskAssessment(assessmentData);
      
      if (result.success) {
        onAssessmentComplete(result.data);
      } else {
        setError(result.error || 'Failed to complete risk assessment. Please try again.');
      }
    } catch (err) {
      console.error('Assessment submission error:', err);
      setError(err.message || err.error || 'Failed to complete risk assessment. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateNetWorth = () => {
    const savings = parseFloat(formData.totalSavings) || 0;
    const debt = parseFloat(formData.totalDebt) || 0;
    return savings - debt;
  };

  const calculateMonthlySurplus = () => {
    const income = parseFloat(formData.monthlyIncome) || 0;
    const expenses = parseFloat(formData.monthlyExpenses) || 0;
    return income - expenses;
  };

  return (
    <div className="assessment-form-container">
      <div className="assessment-form-header">
        <h2>Comprehensive Financial Risk Assessment</h2>
        <p>Provide accurate financial information to receive personalized investment recommendations and risk analysis tailored to your financial situation.</p>
      </div>

      {error && (
        <div className="alert alert-danger">
          <strong>Assessment Error:</strong> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="assessment-form">
        {/* Financial Information Section */}
        <div className="form-section">
          <h3>Monthly Financial Information</h3>
          {/* <p className="section-description">Enter your typical monthly income and expenses in your local currency.</p> */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="monthlyIncome">
                Monthly Gross Income
                <span className="field-info">(Before taxes and deductions)</span>
              </label>
              <input
                type="number"
                id="monthlyIncome"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
                placeholder="5000"
                min="0"
                step="0.01"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="monthlyExpenses">
                Monthly Total Expenses
                <span className="field-info">(Housing, food, utilities, transportation, etc.)</span>
              </label>
              <input
                type="number"
                id="monthlyExpenses"
                name="monthlyExpenses"
                value={formData.monthlyExpenses}
                onChange={handleChange}
                placeholder="3000"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          {formData.monthlyIncome && formData.monthlyExpenses && (
            <div className="financial-summary">
              <p>Monthly Surplus/Deficit: <strong>{calculateMonthlySurplus().toFixed(2)}</strong></p>
            </div>
          )}
        </div>
        <div className="form-section">
          <h3>Asset and Liability Information</h3>
          {/* <p className="section-description">Provide your current total savings and debt amounts.</p> */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="totalSavings">
                Total Savings and Investments
                <span className="field-info">(Bank accounts, investments, retirement funds)</span>
              </label>
              <input
                type="number"
                id="totalSavings"
                name="totalSavings"
                value={formData.totalSavings}
                onChange={handleChange}
                placeholder="25000"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="totalDebt">
                Total Outstanding Debt
                <span className="field-info">(Credit cards, loans, mortgage, etc.)</span>
              </label>
              <input
                type="number"
                id="totalDebt"
                name="totalDebt"
                value={formData.totalDebt}
                onChange={handleChange}
                placeholder="10000"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          {formData.totalSavings && formData.totalDebt && (
            <div className="financial-summary">
              <p>Net Worth: <strong>{calculateNetWorth().toFixed(2)}</strong></p>
            </div>
          )}
        </div>
        {/* Investment Profile Section */}
        <div className="form-section">
          <h3>Investment Experience and Preferences</h3>
          {/* <p className="section-description">Help us understand your investment background and risk preferences.</p> */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="investmentExperience">Investment Experience Level</label>
              <select
                id="investmentExperience"
                name="investmentExperience"
                value={formData.investmentExperience}
                onChange={handleChange}
                required
                className="select-box"
              >
                <option value="">Select Your Experience Level</option>
                <option value="beginner">Beginner (0-2 years of investing experience)</option>
                <option value="intermediate">Intermediate (2-5 years of investing experience)</option>
                <option value="advanced">Advanced (5-10 years of investing experience)</option>
                <option value="expert">Expert (10+ years of investing experience)</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="riskTolerance">Risk Tolerance Preference</label>
              <select
                id="riskTolerance"
                name="riskTolerance"
                value={formData.riskTolerance}
                onChange={handleChange}
                required
                className="select-box"
              >
                <option value="">Select Your Risk Tolerance</option>
                <option value="conservative">Conservative (Prefer safety over high returns)</option>
                <option value="moderate">Moderate (Balanced approach to risk and return)</option>
                <option value="aggressive">Aggressive (Willing to accept higher risk for potential higher returns)</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="investmentGoal">Primary Investment Objective</label>
              <select
                id="investmentGoal"
                name="investmentGoal"
                value={formData.investmentGoal}
                onChange={handleChange}
                required
                className="select-box"
              >
                <option value="">Select Your Primary Goal</option>
                <option value="emergency_fund">Building Emergency Fund</option>
                <option value="education">Education Funding</option>
                <option value="house">Home Purchase</option>
                <option value="retirement">Retirement Planning</option>
                <option value="business">Business Investment</option>
                <option value="wealth_building">Long-term Wealth Building</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="timeHorizon">
                Investment Time Horizon
                <span className="field-info">(Years until you need the money)</span>
              </label>
              <input
                type="number"
                id="timeHorizon"
                name="timeHorizon"
                value={formData.timeHorizon}
                onChange={handleChange}
                placeholder="10"
                min="1"
                max="50"
                required
              />
            </div>
          </div>
        </div>
        {/* Personal Information Section */}
        <div className="form-section">
          <h3>Personal Information</h3>
          {/* <p className="section-description">Your age helps determine appropriate investment strategies.</p> */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age">Current Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="35"
                min="18"
                max="100"
                required
              />
            </div>
          </div>
        </div>
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-risk-submit btn-block"
            disabled={loading}
            style={{ marginTop: '30px', marginBottom: '24px' }}
          >
            {loading ? 'Analyzing Your Financial Profile...' : 'Calculate Risk Assessment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RiskAssessmentForm;