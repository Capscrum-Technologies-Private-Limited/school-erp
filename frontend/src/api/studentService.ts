import api from './axios';
import type { Student, PaginatedResponse } from '../types/domain';

export const studentService = {
  getStudents: async (page = 0, size = 10, sortBy = 'id', sortDir = 'asc'): Promise<PaginatedResponse<Student>> => {
    try {
      const response = await api.get<PaginatedResponse<Student>>('/api/students', {
        params: { pageNo: page, pageSize: size, sortBy, sortDir },
      });
      return response.data || { content: [], totalPages: 0, totalElements: 0, size: 0, number: 0 };
    } catch (error) {
      console.error('Student service error:', error);
      return { content: [], totalPages: 0, totalElements: 0, size: 0, number: 0 };
    }
  },

  getStudentById: async (id: number): Promise<Student> => {
    const response = await api.get<Student>(`/api/students/${id}`);
    return response.data;
  },

  createStudent: async (student: Partial<Student>): Promise<Student> => {
    const response = await api.post<Student>('/api/students', student);
    return response.data;
  },

  updateStudent: async (id: number, student: Partial<Student>): Promise<Student> => {
    const response = await api.put<Student>(`/api/students/${id}`, student);
    return response.data;
  },

  deleteStudent: async (id: number): Promise<void> => {
    await api.delete(`/api/students/${id}`);
  },
};
