import { useState, useEffect } from 'react';
import { 
  Users2, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Loader2,
  Search,
  Filter,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { domainService } from '../api/domainService';
import { userService } from '../api/userService';
import type { StaffAttendance, User } from '../types/domain';

export default function StaffAttendancePage() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [staff, setStaff] = useState<User[]>([]);
  const [attendance, setAttendance] = useState<Record<string, StaffAttendance>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [date]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // In a real app, you'd filter users by staff roles
      const [usersData, attendanceData] = await Promise.all([
        userService.getUsers(),
        domainService.getStaffAttendance(date)
      ]);
      setStaff(usersData);
      
      const attendanceMap: Record<string, StaffAttendance> = {};
      attendanceData.forEach(a => {
        attendanceMap[a.user.id] = a;
      });
      setAttendance(attendanceMap);
    } catch (error) {
      console.error('Failed to fetch staff attendance', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (isoString?: string) => {
    if (!isoString) return '--:--';
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Attendance</h1>
          <p className="text-gray-500 text-sm mt-1">Monitor daily attendance, check-in/out times for all employees.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-1 rounded-xl shadow-sm border border-gray-100">
          <button 
            onClick={() => {
              const d = new Date(date);
              d.setDate(d.getDate() - 1);
              setDate(d.toISOString().split('T')[0]);
            }}
            className="p-2 hover:bg-gray-50 rounded-lg text-gray-400"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 px-3 font-bold text-gray-900">
            <Calendar className="w-4 h-4 text-primary-600" />
            {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          <button 
            onClick={() => {
              const d = new Date(date);
              d.setDate(d.getDate() + 1);
              setDate(d.toISOString().split('T')[0]);
            }}
            className="p-2 hover:bg-gray-50 rounded-lg text-gray-400"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-4 flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Present</p>
            <h4 className="text-xl font-bold text-gray-900">{Object.values(attendance).filter(a => a.status === 'PRESENT').length}</h4>
          </div>
        </div>
        <div className="card p-4 flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Absent</p>
            <h4 className="text-xl font-bold text-gray-900">{Object.values(attendance).filter(a => a.status === 'ABSENT').length}</h4>
          </div>
        </div>
        <div className="card p-4 flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Late</p>
            <h4 className="text-xl font-bold text-gray-900">{Object.values(attendance).filter(a => a.status === 'LATE').length}</h4>
          </div>
        </div>
        <div className="card p-4 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">On Leave</p>
            <h4 className="text-xl font-bold text-gray-900">{Object.values(attendance).filter(a => a.status === 'ON_LEAVE').length}</h4>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search staff members..." className="input pl-10" />
          </div>
          <button className="btn-secondary gap-2 text-sm">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
              <p className="text-gray-500 font-medium">Loading staff records...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Staff Member</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Check In</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Check Out</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {staff.map((member) => {
                  const record = attendance[member.id];
                  return (
                    <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center font-bold text-sm">
                            {member.fullName[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{member.fullName}</p>
                            <p className="text-xs text-gray-500">{member.roles[0].replace('ROLE_', '')}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-600">
                        {formatTime(record?.checkIn)}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-600">
                        {formatTime(record?.checkOut)}
                      </td>
                      <td className="px-6 py-4">
                        {record ? (
                          <span className={clsx(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                            record.status === 'PRESENT' ? "bg-green-100 text-green-700" :
                            record.status === 'ABSENT' ? "bg-red-100 text-red-700" :
                            record.status === 'LATE' ? "bg-amber-100 text-amber-700" :
                            "bg-blue-100 text-blue-700"
                          )}>
                            {record.status}
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-gray-400 italic">No Record</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
