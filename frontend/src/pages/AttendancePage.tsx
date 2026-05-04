import { useState, useEffect } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle,
  Loader2,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';
import { domainService } from '../api/domainService';
import { studentService } from '../api/studentService';
import type { Attendance, Student } from '../types/domain';

export default function AttendancePage() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Record<number, Attendance>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [date]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [studentsData, attendanceData] = await Promise.all([
        studentService.getStudents(0, 100), // Get a batch of students
        domainService.getAttendance(date)
      ]);
      setStudents(studentsData.content);
      
      const attendanceMap: Record<number, Attendance> = {};
      attendanceData.forEach(a => {
        attendanceMap[a.studentId] = a;
      });
      setAttendance(attendanceMap);
    } catch (error) {
      console.error('Failed to fetch attendance data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (studentId: number, status: Attendance['status']) => {
    try {
      await domainService.markAttendance({
        studentId,
        date,
        status
      });
      fetchData(); // Refresh to get the new state
    } catch (error) {
      console.error('Failed to mark attendance', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Tracking</h1>
          <p className="text-gray-500 text-sm mt-1">Daily roll call and attendance reporting.</p>
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

      <div className="card">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search students..." className="input pl-10" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className="flex items-center gap-1.5 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Present: {Object.values(attendance).filter(a => a.status === 'PRESENT').length}
              </span>
              <span className="flex items-center gap-1.5 text-red-600">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                Absent: {Object.values(attendance).filter(a => a.status === 'ABSENT').length}
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
              <p className="text-gray-500 font-medium">Synchronizing attendance records...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Mark Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students && students.length > 0 ? (
                  students.map((student) => {
                  const record = attendance[student.id];
                  return (
                    <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center font-bold text-sm">
                            {student.firstName[0]}{student.lastName[0]}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{student.firstName} {student.lastName}</p>
                            <p className="text-xs text-gray-500">ID: {student.admissionNumber}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {record ? (
                          <span className={clsx(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                            record.status === 'PRESENT' ? "bg-green-50 text-green-700" :
                            record.status === 'ABSENT' ? "bg-red-50 text-red-700" :
                            "bg-amber-50 text-amber-700"
                          )}>
                            {record.status === 'PRESENT' && <CheckCircle2 className="w-3.5 h-3.5" />}
                            {record.status === 'ABSENT' && <XCircle className="w-3.5 h-3.5" />}
                            {record.status === 'LATE' && <Clock className="w-3.5 h-3.5" />}
                            {record.status}
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-gray-400 italic">Not Marked</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleStatusChange(student.id, 'PRESENT')}
                            className={clsx(
                              "p-2 rounded-lg transition-all",
                              record?.status === 'PRESENT' ? "bg-green-600 text-white shadow-lg shadow-green-200" : "text-gray-400 hover:bg-green-50 hover:text-green-600"
                            )}
                          >
                            <CheckCircle2 className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleStatusChange(student.id, 'ABSENT')}
                            className={clsx(
                              "p-2 rounded-lg transition-all",
                              record?.status === 'ABSENT' ? "bg-red-600 text-white shadow-lg shadow-red-200" : "text-gray-400 hover:bg-red-50 hover:text-red-600"
                            )}
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleStatusChange(student.id, 'LATE')}
                            className={clsx(
                              "p-2 rounded-lg transition-all",
                              record?.status === 'LATE' ? "bg-amber-500 text-white shadow-lg shadow-amber-200" : "text-gray-400 hover:bg-amber-50 hover:text-amber-600"
                            )}
                          >
                            <Clock className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-gray-500">
                    No students found for attendance records.
                  </td>
                </tr>
              )}
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
