import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || error);
  }
);

export const jobsAPI = {
  getAll: () => apiClient.get('/jobs'),
  getById: (id) => apiClient.get(`/jobs/${id}`),
  create: (jobData) => apiClient.post('/jobs', jobData),
  update: (id, jobData) => apiClient.put(`/jobs/${id}`, jobData),
  delete: (id) => apiClient.delete(`/jobs/${id}`),
  apply: (applicationData) => {
    const formData = new FormData();
    Object.keys(applicationData).forEach(key => {
      formData.append(key, applicationData[key]);
    });
    return apiClient.post('/jobs/apply', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
};

export const candidatesAPI = {
  getAll: () => apiClient.get('/candidates'),
  getById: (id) => apiClient.get(`/candidates/${id}`),
  create: (candidateData) => apiClient.post('/candidates', candidateData),
  update: (id, candidateData) => apiClient.put(`/candidates/${id}`, candidateData),
  delete: (id) => apiClient.delete(`/candidates/${id}`)
};

export const visaAPI = {
  getAll: () => apiClient.get('/visa-requests'),
  getById: (id) => apiClient.get(`/visa-requests/${id}`),
  create: (visaData) => apiClient.post('/visa-requests', visaData),
  update: (id, visaData) => apiClient.put(`/visa-requests/${id}`, visaData),
  delete: (id) => apiClient.delete(`/visa-requests/${id}`)
};

export const contactAPI = {
  getAll: () => apiClient.get('/contact'),
  getById: (id) => apiClient.get(`/contact/${id}`),
  create: (contactData) => apiClient.post('/contact', contactData),
  delete: (id) => apiClient.delete(`/contact/${id}`)
};

export const adminAPI = {
  login: (credentials) => apiClient.post('/admin/login', credentials),
  getDashboard: () => apiClient.get('/admin/dashboard'),
  createAdmin: (adminData) => apiClient.post('/admin/create-admin', adminData)
};

export default apiClient;
