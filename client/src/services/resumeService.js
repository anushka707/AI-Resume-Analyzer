import { api } from './api';

export async function uploadResume(file) {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post('/upload-resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function getResumeHistory() {
  const { data } = await api.get('/resume-history');
  return data;
}

export async function getResume(id) {
  const { data } = await api.get(`/resume/${id}`);
  return data;
}

export async function deleteResume(id) {
  await api.delete(`/resume/${id}`);
}

export async function compareJobDescription(payload) {
  const { data } = await api.post('/compare-job-description', payload);
  return data;
}

