import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  UserSquare2, 
  Mail, 
  Phone, 
  BookOpen, 
  MoreVertical,
  Edit2,
  Trash2,
  Loader2
} from 'lucide-react';
import { domainService } from '../api/domainService';
import type { Teacher } from '../types/domain';

export default function TeacherListPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const data = await domainService.getTeachers();
      setTeachers(data);
    } catch (error) {
      console.error('Failed to fetch teachers', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTeachers = teachers.filter(t => 
    `${t.firstName} ${t.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.subjectSpecialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.teacherCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teachers</h1>
          <p className="text-gray-500 text-sm mt-1">Manage faculty members and their specializations.</p>
        </div>
        <button className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          Add Teacher
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
            <p className="text-gray-500 font-medium">Loading faculty directory...</p>
          </div>
        ) : filteredTeachers.map((teacher) => (
          <div key={teacher.id} className="card p-6 group hover:border-primary-200 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-xl flex items-center justify-center font-bold text-xl">
                  {teacher.firstName[0]}{teacher.lastName[0]}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{teacher.firstName} {teacher.lastName}</h3>
                  <p className="text-xs font-mono text-gray-400">ID: {teacher.teacherCode}</p>
                  <p className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded mt-1 inline-block">
                    {teacher.subjectSpecialization}
                  </p>
                </div>
              </div>
              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-gray-400" />
                {teacher.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-gray-400" />
                {teacher.phone}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <BookOpen className="w-4 h-4" />
                4 Classes Assigned
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
