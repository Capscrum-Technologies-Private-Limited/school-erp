import { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  MoreVertical,
  Download,
  FileText,
  User,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { domainService } from '../api/domainService';
import type { Homework } from '../types/domain';

export default function HomeworkListPage() {
  const [homework, setHomework] = useState<Homework[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchHomework();
  }, []);

  const fetchHomework = async () => {
    setLoading(true);
    try {
      const data = await domainService.getHomework();
      setHomework(data);
    } catch (error) {
      console.error('Failed to fetch homework', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredHomework = homework.filter(h => 
    h.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assignments & Homework</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track student assignments across all classes.</p>
        </div>
        <button className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          Create Assignment
        </button>
      </div>

      <div className="card">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by title or subject..." 
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-secondary gap-2 text-sm">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
              <p className="text-gray-500 font-medium">Loading curriculum data...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Assignment</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject / Class</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredHomework.map((h) => (
                  <tr key={h.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">{h.title}</span>
                        <span className="text-xs text-gray-400 line-clamp-1 max-w-[200px]">{h.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded w-fit">
                          {h.subject.name}
                        </span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                          Grade {h.schoolClass.grade} - {h.schoolClass.section}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(h.dueDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={clsx(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        h.status === 'ACTIVE' ? "bg-green-100 text-green-700" :
                        h.status === 'COMPLETED' ? "bg-blue-100 text-blue-700" :
                        "bg-gray-100 text-gray-700"
                      )}>
                        {h.status === 'ACTIVE' && <Clock className="w-3 h-3" />}
                        {h.status === 'COMPLETED' && <CheckCircle2 className="w-3 h-3" />}
                        {h.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {h.attachmentUrl && (
                          <a 
                            href={h.attachmentUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                            title="Download Attachment"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        )}
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
