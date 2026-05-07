import api from './axios';

export interface DashboardStats {
  totalStudents?: number;
  totalTeachers?: number;
  totalRevenue?: number;
  attendanceRate?: number;
  assignedClassesCount?: number;
  studentsTaughtCount?: number;
  pendingFees?: number;
  roleMessage?: string;
}

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await api.get('/api/dashboard/stats');
    return response.data;
  },
};
