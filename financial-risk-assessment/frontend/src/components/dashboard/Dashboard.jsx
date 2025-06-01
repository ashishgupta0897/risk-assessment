import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { BsGraphUpArrow } from "react-icons/bs";

const Dashboard = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate('/assessment');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1><span className="header-icon"><BsGraphUpArrow /></span>Financial Risk Assessment Platform</h1>
        <div className="user-info">
          <span>Welcome back, {currentUser?.name}</span>
          <button className="btn btn-sm" onClick={logout}>
            Sign Out
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Advanced Risk Analytics Dashboard</h2>
          <p>
            Your comprehensive financial risk management platform powered by machine learning algorithms
            and real-time market data analysis. Make informed investment decisions with confidence using
            our sophisticated risk assessment tools and predictive modeling capabilities.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Risk Assessment Engine</h3>
            <p>Advanced algorithms analyze multiple risk factors to provide comprehensive investment risk evaluations.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Predictive Analytics</h3>
            <p>Machine learning models predict potential market outcomes and risk scenarios for informed decision-making.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Real-time Monitoring</h3>
            <p>Continuous market surveillance and instant risk alerts to keep your investments protected and optimized.</p>
          </div>
        </div>

        <button
          className="btn btn-lg"
          style={{ marginTop: '0' }}
          onClick={handleStartAssessment}
        >
          Start Risk Assessment
        </button>
      </div>
    </div>
  );
};

export default Dashboard;