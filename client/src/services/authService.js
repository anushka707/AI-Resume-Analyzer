import { api } from './api';

export async function signup(payload) {
  const { data } = await api.post('/signup', payload);
  return data;
}

export async function login(payload) {
  const { data } = await api.post('/login', payload);
  return data;
}

export async function getCurrentUser() {
  const { data } = await api.get('/me');
  return data;
}

