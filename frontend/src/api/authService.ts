import api from './axios';
import type { JwtAuthResponse, LoginRequest, RegisterRequest } from '../types/domain';

export const authService = {
  login: async (data: LoginRequest): Promise<JwtAuthResponse> => {
    const response = await api.post<JwtAuthResponse>('/api/auth/login', data);
    return response.data;
  },
  
  register: async (data: RegisterRequest): Promise<JwtAuthResponse> => {
    const response = await api.post<JwtAuthResponse>('/api/auth/register', data);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },
};
