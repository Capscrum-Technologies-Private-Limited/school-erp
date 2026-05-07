import { useEffect, useState } from 'react';
import { 
  Users, 
  UserSquare2, 
  GraduationCap, 
  CreditCard,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { dashboardService } from '../api/dashboardService';
import type { DashboardStats } from '../api/dashboardService';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await dashboardService.getStats();
        setStats(data);
      } catch (err: any) {
        setError('Failed to load dashboard statistics.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  const isGlobalRole = user?.roles.some(r => ['SUPER_ADMIN', 'ADMIN', 'FINANCE_MANAGER'].includes(r));
  const isParentOrStudent = user?.roles.some(r => ['PARENT', 'STUDENT'].includes(r));
  const isTeacher = user?.roles.some(r => r === 'TEACHER');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">School Overview</h1>
        <p className="text-gray-500 text-sm mt-1">{stats?.roleMessage || "Welcome back, here's what's happening today."}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isGlobalRole && (
          <>
            <StatCard name="Total Students" value={stats?.totalStudents?.toString()} icon={GraduationCap} />
            <StatCard name="Total Teachers" value={stats?.totalTeachers?.toString()} icon={UserSquare2} />
            <StatCard name="Overall Attendance" value={`${stats?.attendanceRate || 0}%`} icon={Users} />
            <StatCard name="Total Revenue" value={`$${stats?.totalRevenue || 0}`} icon={CreditCard} />
          </>
        )}
        
        {isTeacher && (
          <>
            <StatCard name="Assigned Classes" value={stats?.assignedClassesCount?.toString()} icon={Users} />
            <StatCard name="Total Students" value={stats?.studentsTaughtCount?.toString()} icon={GraduationCap} />
          </>
        )}

        {isParentOrStudent && (
          <>
            <StatCard name="Attendance Rate" value={`${stats?.attendanceRate || 0}%`} icon={Users} />
            <StatCard name="Pending Fees" value={`$${stats?.pendingFees || 0}`} icon={AlertCircle} />
          </>
        )}
      </div>

      {isGlobalRole && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary-600" />
                Weekly Attendance
              </h3>
            </div>
            <div className="h-72 min-h-[300px] w-full flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-lg bg-gray-50/50">
               Live chart data integration pending...
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary-600" />
                Revenue Growth
              </h3>
            </div>
            <div className="h-72 min-h-[300px] w-full flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-lg bg-gray-50/50">
               Live chart data integration pending...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ name, value, icon: Icon }: any) {
  return (
    <div className="card p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="p-2 bg-primary-50 rounded-lg">
          <Icon className="w-6 h-6 text-primary-600" />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{name}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value || '0'}</h3>
      </div>
    </div>
  );
}
