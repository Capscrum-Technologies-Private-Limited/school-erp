import { useState, useEffect } from 'react';
import { 
  Trophy, 
  Plus, 
  Search, 
  Calendar, 
  Clock, 
  MapPin,
  MoreVertical,
  ChevronRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { domainService } from '../api/domainService';
import type { Exam } from '../types/domain';

export default function ExamSchedulePage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    setLoading(true);
    try {
      const data = await domainService.getExams();
      setExams(data);
    } catch (error) {
      console.error('Failed to fetch exams', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: Exam['status']) => {
    switch (status) {
      case 'UPCOMING': return 'bg-blue-100 text-blue-700';
      case 'ONGOING': return 'bg-amber-100 text-amber-700 animate-pulse';
      case 'COMPLETED': return 'bg-green-100 text-green-700';
      case 'CANCELLED': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Examination Center</h1>
          <p className="text-gray-500 text-sm mt-1">Schedule exams, manage terms, and monitor ongoing assessments.</p>
        </div>
        <button className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          Create Exam
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="card p-6 bg-gradient-to-br from-primary-600 to-primary-700 text-white border-none">
          <Trophy className="w-8 h-8 opacity-20 mb-4" />
          <p className="text-sm font-medium opacity-80">Next Major Exam</p>
          <h3 className="text-xl font-bold mt-1">Final Term 2026</h3>
          <div className="flex items-center gap-2 mt-4 text-sm opacity-90">
            <Calendar className="w-4 h-4" />
            <span>Starts May 15</span>
          </div>
        </div>
        
        {/* Statistics or Quick Links can go here */}
      </div>

      <div className="card">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search exams by name or code..." className="input pl-10 h-10" />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
              <p className="text-gray-500 font-medium">Synchronizing academic calendar...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Examination</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Class / Term</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {exams.map((exam) => (
                  <tr key={exam.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">{exam.name}</span>
                        <span className="text-[10px] font-mono text-gray-400">{exam.examCode}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-gray-700">Grade {exam.schoolClass.grade} - {exam.schoolClass.section}</span>
                        <span className="text-[10px] font-bold text-primary-600 uppercase tracking-wider">{exam.term.replace('_', ' ')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col text-xs text-gray-500 gap-1">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {new Date(exam.startDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-400">
                          <ChevronRight className="w-3 h-3" />
                          {new Date(exam.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={clsx(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        getStatusColor(exam.status)
                      )}>
                        {exam.status === 'ONGOING' ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                        {exam.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg" title="Manage Results">
                          <FileSpreadsheet className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
