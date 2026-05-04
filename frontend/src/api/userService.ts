import api from './axios';
import type { User } from '../types/domain';

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/api/users');
    return response.data;
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await api.get<User>(`/api/users/${id}`);
    return response.data;
  },

  updateUser: async (id: string, user: Partial<User>): Promise<User> => {
    const response = await api.put<User>(`/api/users/${id}`, user);
    return response.data;
  },

  deleteUser: async (id: string): Promise<string> => {
    const response = await api.delete<string>(`/api/users/${id}`);
    return response.data;
  },

  assignRoles: async (id: string, roles: string[]): Promise<User> => {
    const response = await api.put<User>(`/api/users/${id}/roles`, roles);
    return response.data;
  },
};
