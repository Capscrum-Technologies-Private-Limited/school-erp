import api from './axios';
import type { Role } from '../types/domain';

export const roleService = {
  getRoles: async (): Promise<Role[]> => {
    try {
      const response = await api.get<Role[]>('/api/roles');
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Role service error:', error);
      return [];
    }
  },

  getRoleById: async (id: string): Promise<Role> => {
    const response = await api.get<Role>(`/api/roles/${id}`);
    return response.data;
  },

  getRoleByName: async (name: string): Promise<Role> => {
    const response = await api.get<Role>(`/api/roles/name/${name}`);
    return response.data;
  },
};
