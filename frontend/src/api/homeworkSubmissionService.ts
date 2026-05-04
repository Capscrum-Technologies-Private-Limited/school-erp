import api from './axios';
import type { HomeworkSubmission } from '../types/domain';

export const homeworkSubmissionService = {
  getSubmissions: async (): Promise<HomeworkSubmission[]> => {
    const response = await api.get<HomeworkSubmission[]>('/api/homework-submissions');
    return response.data;
  },

  getSubmissionById: async (id: string): Promise<HomeworkSubmission> => {
    const response = await api.get<HomeworkSubmission>(`/api/homework-submissions/${id}`);
    return response.data;
  },

  createSubmission: async (data: Partial<HomeworkSubmission>): Promise<HomeworkSubmission> => {
    const response = await api.post<HomeworkSubmission>('/api/homework-submissions', data);
    return response.data;
  },

  updateSubmission: async (id: string, data: Partial<HomeworkSubmission>): Promise<HomeworkSubmission> => {
    const response = await api.put<HomeworkSubmission>(`/api/homework-submissions/${id}`, data);
    return response.data;
  },

  deleteSubmission: async (id: string): Promise<void> => {
    await api.delete(`/api/homework-submissions/${id}`);
  },

  getSubmissionsByParent: async (parentId: string): Promise<HomeworkSubmission[]> => {
    const response = await api.get<HomeworkSubmission[]>(`/api/homework-submissions/parent/${parentId}`);
    return response.data;
  },
};
