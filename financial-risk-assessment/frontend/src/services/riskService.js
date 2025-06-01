import api from './api';

export const createRiskAssessment = async (assessmentData) => {
  try {
    const response = await api.post('/risk/assess', assessmentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const getAssessmentHistory = async () => {
  try {
    const response = await api.get('/risk/history');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const getAssessment = async (id) => {
  try {
    const response = await api.get(`/risk/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const deleteAssessment = async (id) => {
  try {
    const response = await api.delete(`/risk/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};