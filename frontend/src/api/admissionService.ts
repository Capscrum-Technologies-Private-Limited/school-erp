import api from './axios';
import type { Admission } from '../types/domain';

export const admissionService = {
  getAdmissions: async (): Promise<Admission[]> => {
    try {
      const response = await api.get<Admission[]>('/api/admissions');
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Admission service error:', error);
      return [];
    }
  },

  getAdmissionById: async (id: string): Promise<Admission> => {
    const response = await api.get<Admission>(`/api/admissions/${id}`);
    return response.data;
  },

  createAdmission: async (data: Partial<Admission>): Promise<Admission> => {
    const response = await api.post<Admission>('/api/admissions', data);
    return response.data;
  },

  updateAdmission: async (id: string, data: Partial<Admission>): Promise<Admission> => {
    const response = await api.put<Admission>(`/api/admissions/${id}`, data);
    return response.data;
  },

  deleteAdmission: async (id: string): Promise<string> => {
    const response = await api.delete<string>(`/api/admissions/${id}`);
    return response.data;
  },

  approveAdmission: async (id: string, reviewedBy = 'system'): Promise<Admission> => {
    const response = await api.post<Admission>(`/api/admissions/${id}/approve?reviewedBy=${reviewedBy}`);
    return response.data;
  },

  rejectAdmission: async (id: string, reason: string, reviewedBy = 'system'): Promise<Admission> => {
    const response = await api.post<Admission>(`/api/admissions/${id}/reject?reason=${reason}&reviewedBy=${reviewedBy}`);
    return response.data;
  },
};
