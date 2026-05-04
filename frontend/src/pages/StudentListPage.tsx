import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye,
  ChevronLeft,
  ChevronRight,
  Loader2,
  UserPlus
} from 'lucide-react';
import { studentService } from '../api/studentService';
import type { Student } from '../types/domain';
import { StudentFormModal } from '../components/StudentFormModal';

export default function StudentListPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, [page]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await studentService.getStudents(page);
      setStudents(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Failed to fetch students', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (data: any) => {
    setIsSubmitting(true);
    try {
      await studentService.createStudent(data);
      setIsModalOpen(false);
      fetchStudents();
    } catch (error) {
      console.error('Failed to create student', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and view student records</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Student
        </button>
      </div>

      <div className="card">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, ID, or email..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-secondary gap-2 text-sm py-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
              <p className="text-gray-500 font-medium">Loading student data...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Admission ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students && students.length > 0 ? (
                  students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold">
                            {student.firstName?.[0]}{student.lastName?.[0]}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{student.firstName} {student.lastName}</p>
                            <p className="text-xs text-gray-500">{student.studentCode}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-mono text-gray-600">{student.studentCode || 'N/A'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-600 font-medium">Grade {student.schoolClass?.grade || 'N/A'}</span>
                          <span className="text-[10px] text-gray-400 uppercase tracking-wider">{student.schoolClass?.section || 'No Section'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={clsx(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                          student.status === 'ACTIVE' ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        )}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">120</span> results
          </p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="btn-secondary p-2 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-gray-700">Page {page + 1} of {totalPages || 1}</span>
            <button 
              onClick={() => setPage(p => p + 1)}
              disabled={page >= totalPages - 1}
              className="btn-secondary p-2 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <StudentFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddStudent}
        isLoading={isSubmitting}
      />
    </div>
  );
}

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
