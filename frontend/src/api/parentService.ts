import api from './axios';
import type { Parent, ParentStudentLink } from '../types/domain';

export const parentService = {
  getParents: () => api.get<Parent[]>('/api/parents').then(r => r.data),
  getParentById: (id: string) => api.get<Parent>(`/api/parents/${id}`).then(r => r.data),
  createParent: (data: Partial<Parent>) => api.post<Parent>('/api/parents', data).then(r => r.data),
  updateParent: (id: string, data: Partial<Parent>) => api.put<Parent>(`/api/parents/${id}`, data).then(r => r.data),
  deleteParent: (id: string) => api.delete<string>(`/api/parents/${id}`).then(r => r.data),

  getLinkedStudents: (parentId: string) => 
    api.get<ParentStudentLink[]>(`/api/parents/${parentId}/students`).then(r => r.data),
  
  linkStudent: (parentId: string, studentId: string, isPrimaryContact = false) => 
    api.post<ParentStudentLink>(`/api/parents/${parentId}/students/${studentId}?isPrimaryContact=${isPrimaryContact}`)
      .then(r => r.data),
  
  getParentsByStudent: (studentId: string) => 
    api.get<ParentStudentLink[]>(`/api/parents/by-student/${studentId}`).then(r => r.data),
};
